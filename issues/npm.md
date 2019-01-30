### after npm install, xxx: command not found
kbradl16 commented on 1 Oct 2017 • 
This was a pain to figure out, so here is my solution

npm install -g @angular/cli

Make sure the ng path is correct

cd ~/npm-global/bin
ls and make sure ng exists
create .bashrc file on your home directory

touch ~/.bashrc
vim ~/.bashrc
Add ng as alias

press a (enables edit mode) then type in the following
alias ng="~/npm-global/bin/ng"
press esc (to get out of edit mode) then :wq (in vim will save)
Temporarily Update .bashrc reference
Your terminal wont take bash updates until a restart but the following command will let you use the updates during the terminal session:

source ~/.bashrc
Check that ng works

ng --version
Hope that helps someone!

EDIT: To use this method you must be in a bash prompt or add the source ~/.bashrc to your terminal session. You can get into one by typing bash then enter in your terminal window. @shanemac10 's answer below will add it to your normal terminal by appending your mac PATH. (the one difference for me was my npm-global folder did not have a '.' in front of it)

注意：mac的npm-global是隐藏文件夹，所以前面要加`.`。

## 上一个解决方案好像不管用，
可能的原因：mac改版，使用`~/.bash_profile`文件

If you have a MacOS computer (mine is MOJAVE 10.14.2), just add these lines to the end of your ~/.bash_profile file:

export ANGULAR=~/.nvm/versions/node/v10.8.0/bin/ng
export PATH=$ANGULAR:$PATH
```
测试另一种
alias ng="....."
```
Notice that v10.8.0 is the version of my installed Node.js. To get which version is yours, run this:

node --version
When done, reload it via your terminal/bash:

cd ~
source .bash_profile
After doing these steps you should be able to run your ng binary file.
