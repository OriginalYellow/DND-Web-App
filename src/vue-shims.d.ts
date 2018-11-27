//MIKE: magically makes exporting from typescript script tags possible (source: https://github.com/Microsoft/TypeScript-Vue-Starter#single-file-components)

declare module "*.vue" {
    import Vue from "vue";
    export default Vue;
}