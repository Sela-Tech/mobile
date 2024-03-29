package com.selamobile2;

import android.app.Application;

import com.facebook.react.ReactApplication;
import com.airbnb.android.react.lottie.LottiePackage;
import com.horcrux.svg.SvgPackage;
import com.brentvatne.react.ReactVideoPackage;
import org.wonday.pdf.RCTPdfView;
import com.RNFetchBlob.RNFetchBlobPackage;
import com.airbnb.android.react.maps.MapsPackage;
import com.oblador.vectoricons.VectorIconsPackage;
import com.imagepicker.ImagePickerPackage;
import com.arttitude360.reactnative.rngoogleplaces.RNGooglePlacesPackage;
import com.swmansion.gesturehandler.react.RNGestureHandlerPackage;
import com.facebook.react.ReactNativeHost;
import com.facebook.react.ReactPackage;
import com.facebook.react.shell.MainReactPackage;
import com.facebook.soloader.SoLoader;
// import com.github.wuxudong.rncharts.MPAndroidChartPackage;

// import com.facebook.react.bridge.ReadableNativeArray;
// import com.facebook.react.bridge.ReadableNativeMap;

import java.util.Arrays;
import java.util.List;

public class MainApplication extends Application implements ReactApplication {

  private final ReactNativeHost mReactNativeHost = new ReactNativeHost(this) {
    @Override
    public boolean getUseDeveloperSupport() {
      return BuildConfig.DEBUG;
    }

    @Override
    protected List<ReactPackage> getPackages() {
      return Arrays.<ReactPackage>asList(new MainReactPackage(),
            new LottiePackage(),
            new SvgPackage(),
          // new RNInstabugReactnativePackage.Builder("a1713df89289cd1a3490a23f2a1c8208",
          // MainApplication.this)
          // .setInvocationEvent("shake").setPrimaryColor("#1D82DC").setFloatingEdge("left")
          // .setFloatingButtonOffsetFromTop(250).build(),
          new ReactVideoPackage(), new RCTPdfView(), new RNFetchBlobPackage(), new ReactVideoPackage(),
          new MapsPackage(), new VectorIconsPackage(),
          // new SvgPackage(),
          new ImagePickerPackage(), new RNGooglePlacesPackage(), // new MPAndroidChartPackage(),
          new RNGestureHandlerPackage());
    }

    @Override
    protected String getJSMainModuleName() {
      return "index";
    }
  };

  @Override
  public ReactNativeHost getReactNativeHost() {
    return mReactNativeHost;
  }

  @Override
  public void onCreate() {
    super.onCreate();
    // ReadableNativeArray.setUseNativeAccessor(true);
    // ReadableNativeMap.setUseNativeAccessor(true);

    SoLoader.init(this, /* native exopackage */ false);
    // ReadableNativeArray.setUseNativeAccessor(true);
    // ReadableNativeMap.setUseNativeAccessor(true);
  }
}
