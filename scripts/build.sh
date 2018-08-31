cd public;
rm -rf php;
ln -s ../public-php php;
cd ..;

ng build -c production;
