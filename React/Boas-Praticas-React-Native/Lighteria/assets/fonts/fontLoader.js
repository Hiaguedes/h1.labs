import { useFonts } from '@use-expo/font';

export default FontLoader = () => {
     const [isLoaded] = useFonts({
        'openSansBold': require('./OpenSans-Bold.ttf'),
        'openSansExtraBold': require('./OpenSans-ExtraBold.ttf'),
        'openSansLight': require('./OpenSans-Light.ttf'),
        'openSansRegular': require('./OpenSans-Regular.ttf'),
        'openSansSemiBold': require('./OpenSans-SemiBold.ttf'),
    })

    return isLoaded;
}
