import WebFont from 'webfontloader';

export default function getFontsAsync() {
    WebFont.load({
        google: {
            families: ['Roboto:700,500,400']
        }
    });
}