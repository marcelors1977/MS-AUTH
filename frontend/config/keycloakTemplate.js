
const fs = require('fs');
const path = require('path');
const paths = require('./paths');

module.exports = (themesDir) => {
    const themes = [];
    
    for( const themeDir of themesDir) {
        const keycloakTemplates = [];
        const pagesDirs = fs.readdirSync(path.join(paths.keycloakThemesPath, themeDir)).filter(dir => dir.endsWith('-pages'));
        for(const pagesDir of pagesDirs) {
          const templatesDirs = fs.readdirSync(path.join(paths.keycloakThemesPath,themeDir, pagesDir)).filter(dir => dir.endsWith('-template'));
      
          for(const templateDir of templatesDirs) {
            const ftlTemplates = fs.readdirSync(path.join(paths.keycloakThemesPath,themeDir, pagesDir,templateDir)).filter(file => file.endsWith('.ftl'));
            const componentPages = fs.readdirSync(path.join(paths.keycloakThemesPath,themeDir, pagesDir,templateDir)).filter(file => file.endsWith('.page.tsx'));
            if(ftlTemplates.length && componentPages.length){
              const ftlTemplate = ftlTemplates[0];
              const componentPage = componentPages[0];
      
              keycloakTemplates.push({
                templateSrc: path.join(paths.keycloakThemesPath, themeDir, pagesDir, templateDir, ftlTemplate),
                templateOut: path.join(themeDir,pagesDir.replace('-pages',''), ftlTemplate),
                entry: {
                  chunk: ftlTemplate.replace('.ftl',''),
                  path: path.join(paths.keycloakThemesPath, themeDir, pagesDir, templateDir, componentPage)
                }
      
              });
            }
          }
        }    

        if(keycloakTemplates.length){
            themes.push({
              themeDir: themeDir,
              templates: keycloakTemplates
            })
          }
    }

    return themes;
}