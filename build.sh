dir=$(cd "$(dirname "$0")";pwd)
cd $dir/packages/form-render/ && yarn build
cd $dir/packages/e-form-render/ && yarn build
cd $dir/packages/fr-generator/ && yarn build
cd $dir/packages/emalutor/ && yarn build