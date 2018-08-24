cd public;
rm -rf php;
ln -s ../public-php php;
cd ..;

ng serve --host 0.0.0.0;
