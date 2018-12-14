#!/bin/bash
yum -y update
yum -y install git
yum -y groupinstall 'Development Tools'
cd ~
curl -o- https://raw.githubusercontent.com/creationix/nvm/v0.32.0/install.sh | bash
. /.nvm/nvm.sh
nvm install 10.13.0
npm install --global gatsby-cli
mkdir build_gatsby
mkdir gatsby
cd build_gatsby
git clone https://github.com/ashleybeshir/React-website.git
cd React-website
cd src
mkdir images
cd ..
rm -rf node_modules/
npm install 
npm audit fix
gatsby build
cd ~
cd gatsby
git clone https://github.com/ashleybeshir/ashleybeshir.github.io.git
rm -rf my-website/*
cd ..
cp -R build_gatsby/React-website/public/. gatsby/my-website
cd gatsby/my-website
git config --local user.email "ashleybeshir0@gmail.com"
git config --local user.name "ashleybeshir"
git add .
git commit -m "ec2 build"
git remote rm origin
git remote add origin https://ashleybeshir:744a4bd5e1cf7629e27a178765831145@github.com/ashleybeshir/ashleybeshir.github.io.git
git push --porcelain --set-upstream origin master
shutdown -h now