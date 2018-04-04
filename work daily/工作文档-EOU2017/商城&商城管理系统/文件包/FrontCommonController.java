package org.weiyun.common.controller;

import java.util.Map;
import java.util.UUID;

import org.weiyun.common.constant.CommonConstant;
import org.weiyun.common.controller.BaseController;
import org.weiyun.common.qcloud.PicCloud;
import org.weiyun.common.qcloud.SliceUploadInfo;
import org.weiyun.common.util.DateUtil;
import org.weiyun.common.util.WeiyunSaasSQLUtil;

import com.qcloud.cos.COSClient;
import com.qcloud.cos.ClientConfig;
import com.qcloud.cos.meta.InsertOnly;
import com.qcloud.cos.request.UploadFileRequest;
import com.qcloud.cos.sign.Credentials;

public class FrontCommonController extends BaseController {

	// 腾讯cos图片存储v2.0
	protected String uploadImage(byte[] data, int fileSize, int sliceSize) {
		// 初始化客户端配置
		ClientConfig clientConfig = new ClientConfig();
		// 设置bucket所在的区域，比如广州(gz), 天津(tj)
		clientConfig.setRegion(CommonConstant.COSREGION);
		// 初始化秘钥信息
		Credentials cred = new Credentials(CommonConstant.APPID,
				CommonConstant.SECRETID, CommonConstant.SECRETKEY);
		// 初始化cosClient
		COSClient cosClient = new COSClient(clientConfig, cred);
		WeiyunSaasSQLUtil mysqlUtil = new WeiyunSaasSQLUtil();
		String pictureFloder = DateUtil.getCurrentDate(DateUtil.patternB);
		String pictureName = UUID.randomUUID().toString() + ".jpg";
		String cosFilePath = "/images/" + pictureFloder + "/" + pictureName;
		UploadFileRequest overWriteFileRequest = new UploadFileRequest(CommonConstant.BUCKETNAME, cosFilePath, data);
		overWriteFileRequest.setInsertOnly(InsertOnly.OVER_WRITE);
		overWriteFileRequest.setTaskNum(2);
		String overWriteFileRet = cosClient.uploadFile(overWriteFileRequest);
		System.out.println("overwrite file ret:" + overWriteFileRet);
		mysqlUtil.addImage(cosFilePath, cosFilePath);
		return cosFilePath;
		
	}
	/*
	//保存到本地开启这个代码
	protected String uploadImage(MultipartFile mFile){
		try {
			// 得到上传服务器的路径
	    	String url=this.getRequest().getRequestURL().toString();
	    	String name=this.getRequest().getContextPath();
	    		url=url.substring(0, url.indexOf(name))+name;
	    	
	        String path = this.getRequest().getSession().getServletContext().getRealPath("");
	        // 得到上传的文件的文件名
	        String oldfile=mFile.getOriginalFilename();
	       File temp = new File(path+"/upload/images/");
	       if(!temp.exists()){
	    	   temp.mkdirs();
	       }
	        String filename ="/upload/images/"+DateUtil.getCurrentDate(DateUtil.patternF)+UUID.randomUUID()+oldfile.substring(oldfile.lastIndexOf("."));
	        path += filename;
	        
	        url=url+filename;

	        File file =new File(path);    
	        if(!file.exists())    
	        {    
	            try {    
	                file.createNewFile();    
	            } catch (IOException e) {    
	                e.printStackTrace();    
	            }    
	        }
	        byte[] bytes = mFile.getBytes();
	        BufferedOutputStream stream =
	                new BufferedOutputStream(new FileOutputStream(file));
	        stream.write(bytes);
	        stream.close();
	        return url;
		} catch (Exception e) {
			// TODO: handle exception
			return null;
		}
		
	}*/
}