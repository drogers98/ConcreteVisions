## Browser build
ionic serve

## Device builds/deploys
ionic cordova platform add android
or
ionic cordova platform add ios

**to run:**

ionic cordova run android --device
ionic cordova run ios
ionic cordova run ios --prod --release
to build

ionic cordova build android
ionic cordova build ios
ionic cordova build ios --prod --release

# Splash screens and icons
ionic cordova resources [<platform>]

Ionic can automatically generate perfectly sized icons and splash screens from source images (.png, .psd, or .ai) for your Cordova platforms.

The source image for icons should ideally be at least 1024×1024px and located at resources/icon.png. The source image for splash screens should ideally be at least 2732×2732px and located at resources/splash.png. If you used ionic start, there should already be default Ionic resources in the resources/ directory, which you can overwrite.

You can also generate platform-specific icons and splash screens by placing them in the respective resources/<platform>/ directory. For example, to generate an icon for Android, place your image at resources/android/icon.png.

By default, this command will not regenerate resources whose source image has not changed. To disable this functionality and always overwrite generated images, use --force

# To deploy

- Change version in config.xml.
- build for ios/android.
create new release in itunes connect

## ios
- select "generic ios device"
- product > archive fromk main menu

## android
- run ionic cordova platform update android for any build issues first