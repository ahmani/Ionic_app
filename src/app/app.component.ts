/// <reference path="WikitudePlugin.d.ts" />
import { Component } from '@angular/core';
import { Platform } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import { TabsPage } from '../pages/tabs/tabs';


@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  rootPage = TabsPage;

  constructor(platform: Platform, statusBar: StatusBar, splashScreen: SplashScreen) {
    platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      statusBar.styleDefault();

      /** Enter your Wikitude (trial) License Key here */
      WikitudePlugin._sdkKey = "VdFqQzUsY3sKHJnsWrc9QAXizJ8LefvTSJcO6bGESzh1IwiewEW1AxeSVNmBPc1MIGerAKEuyl3/8avuN7U42xcs1r91ZF7kkllRAGfCgToZXv0sPXoNp4XuH9Ua4DWbZ92ysc6xFUQRfXxQli8TWKI0CN4Ll9iTGw5rWBxeKEVTYWx0ZWRfXz/Mm9s1QfviCg/Nht9xYiuFHEwD75N53j9KHOPe7FpBtJG2kUcWl057F2DASPtFbAQwkOtat1IGZyggA6Qz8uuWlJ0TRCb1qU9CH3N2LCkqUP4RQ8QEtMyHjSOy3EgsCtpDeC45BYmkHAja5QCEJWwSJcYGWpNRUerG/lueV9ihe4DXg6b6+21bDzJDuO8S5U329YwpBgzItN7cOG3euS46i8VO3YVYEC8wgar5OSJdNHiu+/0W5lrimEMG+f9JRs9KSEMGL5g4xBNx5nwvJBAQjsekz8BbMmDJwOIipY5s6OvcITLwllxGvujih9vgq2uhTBuv8ytXUokSkyL9uzatAxyLcfJT0WeBxK0I4R8O5awBVKzBOHfM/BlUXqLB8MiwrT/rLhdISYM5XR9pAy6FoARrHy2GkgiQiyqJmjRHOnSBJXnWjmDtZPGMBXBtMfmNcCP28W3D9zpMo66cecRO26VPCVSPNU74aHYA6yBLx3+MmK9UlOQ=";

      /** Check if your device supports AR */
      WikitudePlugin.isDeviceSupported(
          function(success) {
            console.log("Your platform supports AR/Wikitude. Have fun developing!!");
          },
          function(fail) {
            console.log("Your platform failed to run AR/Wikitude: "+fail);
          },
          [WikitudePlugin.FeatureGeo] // or WikitudePlugin.Feature2DTracking 
      );                  

      /** The Wikitude AR View creates it's own context. Communication between the main Ionic App and Wikitude SDK works 
       * through the function below for the direction Ionic2 app --> Wikitude SDK 
       * For calls from Wikitude SDK --> Ionic2 app see the captureScreen example in 
       * WikitudeIonic2StarterApp/www/assets/3_3dModels_6_3dModelAtGeoLocation/js/3dmodelatgeolocation.js*/
      // set the function to be called, when a "communication" is indicated from the AR View  
      WikitudePlugin.setOnUrlInvokeCallback(function(url) {

        // this an example of how to receive a call from a function in the Wikitude SDK (Wikitude SDK --> Ionic2)
        if (url.indexOf('captureScreen') > -1) {
            WikitudePlugin.captureScreen(
                (absoluteFilePath) => {
                    console.log("snapshot stored at:\n" + absoluteFilePath);

                    // this an example of how to call a function in the Wikitude SDK (Ionic2 app --> Wikitude SDK)
                    WikitudePlugin.callJavaScript("World.testFunction('Screenshot saved at: " + absoluteFilePath +"');");
                },
                (errorMessage) => {
                    console.log(errorMessage);
                },
                true, null
            );
        } else {
            alert(url + "not handled");
        }
      });

      /**
       * Define the generic ok callback
       */
      WikitudePlugin.onWikitudeOK = function() {
          console.log("Things went ok.");
      }
      
      /**
       * Define the generic failure callback
       */
      WikitudePlugin.onWikitudeError = function() {
          console.log("Something went wrong");
      }

      // Just as an example: set the location within the Wikitude SDK, if you need this (You can get the geo coordinates by using ionic native 
      // GeoLocation plugin: http://ionicframework.com/docs/v2/native/geolocation/
      //WikitudePlugin.setLocation(47, 13, 450, 1);

      /* for Android only
      WikitudePlugin.setBackButtonCallback(
          () => {
              console.log("Back button has been pressed...");
          }
      );                  
      */

    });
  }
}
