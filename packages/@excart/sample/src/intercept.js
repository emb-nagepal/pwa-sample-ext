/**
 * Custom intercept file for the extension
 * By default you can only use target of @magento/pwa-buildpack.
 *
 * If do want extend @magento/peregrine or @magento/venia-ui
 * you should add them to peerDependencies to your package.json
 *
 * If you want to add overwrites for @magento/venia-ui components you can use
 * moduleOverrideWebpackPlugin and componentOverrideMapping
 */

const moduleOverrideWebpackPlugin = require('./moduleOverrideWebpackPlugin');
const componentOverrideMapping = require('./componentOverrideMapping')


// Import the Targetables manager
const { Targetables } = require("@magento/pwa-buildpack");

function localIntercept(targets) {
  // Create a bound Targetable factory
  const targetables = Targetables.using(targets);

  // Create a React component targetable linked to the productFullDetail.js file
  const ProductDetails = targetables.reactComponent(
    "@excart/sample/src/overrides/ProductFullDetail/productFullDetail.js"
  ); 

  // Add an import statement to the productFullDetail.js file and
  // return the SingleImportStatement object
  const TagList = ProductDetails.addImport("{TagList} from '@excart/sample/src/components/TagLists/index'"); 
 
  // Insert the TagList component after the product description and pass in the
  // new categoriesListData object added to the useProductFullDetails() hook
  ProductDetails.insertAfterJSX(
    "<RichContent html={productDetails.description} />",
    `<${TagList} categoriesListData={productDetails.categoriesListData} />`
  );

  // Create an ES Module targetable linked to the useProductFullDetail.js file
  const useProductFullDetails = targetables.esModule(
    "@excart/sample/src/talons/ProductFullDetail/useProductFullDetail.js"
  );

  // Wrap the useProductFullDetail hook with your extension's wrapper file
  useProductFullDetails.wrapWithFile(
    "useProductFullDetail",
    "@excart/sample/src/targets/wrapper"
  ); 
  
  
  targets.of('@magento/pwa-buildpack').specialFeatures.tap(flags => {
    /**
     *  Wee need to activated esModules and cssModules to allow build pack to load our extension
     * {@link https://magento.github.io/pwa-studio/pwa-buildpack/reference/configure-webpack/#special-flags}.
     */
    flags[targets.name] = {esModules: true, cssModules: true};
    });
    targets.of('@magento/venia-ui').routes.tap(
        routesArray => {
            routesArray.push({
                name: "MyGreetingRoute",
                pattern: "/greeting/:who?",
                path: require.resolve("@excart/sample/src/components/GreetingPage/greetingPage.js"),
            });
        return routesArray;
    });

    targets.of('@magento/pwa-buildpack').webpackCompiler.tap(compiler => {
        new moduleOverrideWebpackPlugin(componentOverrideMapping).apply(compiler);
    })
}

module.exports = localIntercept;