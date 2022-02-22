/**
 * Mappings for overwrites
 * example: [`@magento/venia-ui/lib/components/Main/main.js`]: './lib/components/Main/main.js'
 */

module.exports = componentOverride = {
    [`@magento/venia-ui/lib/components/App/index.js`]: './packages/@excart/sample/src/overrides/App/index.js',
    [`@magento/venia-ui/lib/components/Header/header.js`]: '@excart/sample/src/overrides/Header/header.js',
    [`@magento/venia-ui/lib/components/Footer/footer.js`]: './packages/@excart/sample/src/overrides/Footer/footer.js',
};
