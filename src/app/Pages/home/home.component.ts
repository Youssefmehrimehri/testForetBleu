/* tslint:disable */
import {
  AfterViewInit,
  ChangeDetectorRef,
  Component,
  ElementRef,
  OnChanges,
  OnInit,
  ViewChild,
} from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { SettingService } from '../../Shared/Services/setting.service';
import { CourseService } from '../../Shared/Services/course.service';
import { error } from 'protractor';
import { ToastrService } from 'ngx-toastr';
import { client } from 'src/app/Shared/Models/client';
import { JwtHelperService } from '@auth0/angular-jwt';
import { StorageService } from 'src/app/Shared/Services/storage.service';
import { AgencyService } from 'src/app/Shared/Services/agency.service';
import { AuthService } from 'src/app/Shared/Services/auth.service';
import { ConditionalExpr } from '@angular/compiler';

function convertToNumber(parametervalue: string): number {
  const numberValue: number = parseInt(parametervalue, 10); // The second argument is the radix/base, which is 10 for decimal numbers.
  return numberValue;
}
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnChanges, OnInit {
  polylinePath: Array<{ lat: number; lng: number }> = [];
  @ViewChild('destinationInput') destinationInput: ElementRef;
  showPrice = false;

  @ViewChild('target') targetElement!: ElementRef;
  destination: string;
  client: client;
  pType!: any;
  map: any;
  email: string = '';
  zoom = 15;
  emailEmpty: boolean = false;
  idClient!: number;
  lat1!: any;
  long1!: any;
  pourcentValue!: number;
  polylineOptions = {
    strokeColor: '#8A0797',
    strokeOpacity: 3.0,
    strokeWeight: 5,
  };
  //Stafim
  center = {
    lat: Number(localStorage.getItem('lat')),
    lng: Number(localStorage.getItem('lng')),
  };
  // Casino Djerba
  // center = { lat: 33.85839074386289, lng: 10.976566788630452 };
  // tunis
  // center = { lat: 37.11836326086611, lng: 9.993317055373634 };

  //Royal Garden
  //center = { lat: 33.826837569050085, lng: 11.017902642327801 };

  //Palm Azure djerba
  //center = { lat: 33.76329632714767, lng: 11.020111909222582 };

  //Patio mezraya
  //center = { lat: 33.86066944445947, lng: 10.953717064860976 };

  // Djerba Resort
  //center = { lat: 33.83977776701574, lng: 10.994112694478341 };

  markerPosition: google.maps.LatLngLiteral;
  distanceKm: number;
  directionsResult: google.maps.DirectionsResult;
  directionsRenderer: google.maps.DirectionsRenderer;
  ispopUpShowProfil: boolean = false;
  settingObject: any;
  BusyObject: any;
  expectedPrice: any;
  expectedDistance: any;
  adress: any;
  DurationExpected: any;
  numTel: number;
  initialnumTel: string = '';
  ispopUpShow: boolean = false;
  isExecuting: boolean = false;
  showEmail: boolean = false;
  showErrorNumTel: boolean = false;
  isButtonDisabled: boolean = true;
  isButtonDisabledOption: boolean = true;
  loading: boolean = false;
  paiementType: string = '';
  nom: string = '';
  treatmentType!: string;
  creationDisabled: boolean = true;
  disabledButtonCreation: boolean = true;
  prenom: string = '';
  agent: boolean = false;
  checkNumber: boolean = false;
  currentTime: string = '';
  ErrorMessage: boolean = false;
  status: string = '';
  show = localStorage.getItem('show');
  helper = new JwtHelperService();
  roleLibelle = '';
  pourcentValueOpen: boolean = false;
  //?  All , NONE , POURCENTAGE
  //? pourcentage valeur entre  0 et 100 (exclu 0 et 100)
  paiement = [
    'Prise en charge total',
    'Sans prise en charge',
    'Prise en charge partielle',
  ];
  createCourseObject = {
    placeIdBegin: '',
    addressBegin: '',
    latitudeBegin: 0,
    longitudeBegin: 0,
    placeIdEnd: '',
    addressEnd: '',
    latitudeEnd: 0,
    longitudeEnd: 0,
    distance: 0,
    expectedTime: 0,
    expectedPrice: 0,
    numClientStafim: '',
    //Stafim

    // "idAgent":Number(localStorage.getItem('agent_id')),
    //Casino
    //"numEntreprise":"77885500",
    //Gardin
    //"numEntreprise":"77885511",
    //Resort
    //"numEntreprise":"77885522",
    //MarieCurie
    //"numEntreprise":"77885533",
    //PalmAzure
    //"numEntreprise":"77885555",
    //PatioMezraya
    //"numEntreprise":"77885566",
    idReg: 0,
    poucentageValue: this.pourcentValue,
    treatmentType: this.treatmentType,
  };

  markerClientIcon = {
    draggable: false,
    icon: {
      url: 'assets/pinClient.png',
      scaledSize: {
        width: 35,
        height: 37,
      },
    },
  };
  markerClientIconGreen = {
    draggable: false,
    icon: {
      url: 'assets/pinClient.png',
      scaledSize: {
        width: 35,
        height: 37,
      },
    },
  };
  constructor(
    private readonly elementRef: ElementRef,
    private courseService: CourseService,
    private toastr: ToastrService,
    private cdr: ChangeDetectorRef,
    private settingService: SettingService,
    private storageService: StorageService,
    private agencyService: AgencyService,
    private authService: AuthService
  ) {}

  ngOnInit() {
    this.getRole();
    // console.log(this.center,'center')
    // this.getAllSettings();
    // this.getAllBusyHours();
  }
  getRole() {
    this.authService
      .getInfoUser(String(localStorage.getItem('token')))
      .subscribe((resData: any) => {
        this.roleLibelle = resData.data.role[0].libelle;
      });
  }

  hasRequiredRole(requiredRole: string): boolean {
    const decodedPayload = this.helper.decodeToken(
      this.storageService.getToken()
    );
    localStorage.setItem('agentId', decodedPayload.agent_id);
    // console.log(decodedPayload.iss,'ydy')
    return this.roleLibelle === requiredRole;
  }
  getAllSettings(idRegion: number) {
    // console.log(idRegion, 'id');
    this.settingService.GetParamsByIdRegion(idRegion).subscribe((res: any) => {
      // console.log(res, 'params');

      this.settingObject = res.data;
      // console.log(this.settingObject, 'object');

      this.getAllBusyHours(idRegion);
    });
  }

  getAllBusyHours(idRegion: number) {
    this.settingService.GetAllBusyByid(idRegion).subscribe((res: any) => {
      // console.log(res, 'paramsByusyu');

      this.BusyObject = res.data;
      // console.log(this.BusyObject, 'busy');
      this.checkCurrentTimeStatus();
    });
  }

  IfPIsPourcent(event: any) {
    if (this.paiementType === 'prise en charge partielle') {
      this.pourcentValueOpen = true;
    }
  }
  checkNumberValidity() {
    if (
      this.pourcentValue !== 0 &&
      this.pourcentValue !== 100 &&
      this.pourcentValue >= 0 &&
      this.pourcentValue <= 100
    ) {
    } else {
      this.checkNumber = true;
    }
  }
  calculPriceForRace() {
    if(Number(this.expectedDistance) > 2){
      if (this.status === 'day') {
        // console.log('day');
        this.expectedPrice =
          parseFloat(this.settingObject[0].parametervalue) +
          this.expectedDistance *
            parseFloat(this.settingObject[1].parametervalue);
        this.showPrice = true;
        // console.log('day', this.expectedPrice);
      } else if (this.status === 'busy') {
        // console.log('busy');
  
        this.expectedPrice =
          parseFloat(this.settingObject[0].parametervalue) +
          this.expectedDistance *
            parseFloat(this.settingObject[3].parametervalue);
        this.showPrice = true;
  
        // console.log(this.expectedPrice, 'pricve');
      } else {
        // console.log('else');
        // console.log(this.settingObject[2], '2222else');
        this.expectedPrice =
          parseFloat(this.settingObject[0].parametervalue) +
          this.expectedDistance *
            parseFloat(this.settingObject[2].parametervalue);
        this.showPrice = true;
      }
    }else{
      if (this.status === 'day') {
        // console.log('day');
        this.expectedPrice =this.settingObject[4].parametervalue
        this.showPrice = true;
        // console.log('day', this.expectedPrice);
      } else if (this.status === 'busy') {
        // console.log('busy');
  
        this.expectedPrice =this.settingObject[4].parametervalue
        this.showPrice = true;
  
        // console.log(this.expectedPrice, 'pricve');
      } else {
        // console.log('else');
        // console.log(this.settingObject[2], '2222else');
        this.expectedPrice =this.settingObject[2].parametervalue
        this.showPrice = true;
      }
    }

  }
  checkCurrentTimeStatus() {
    const now = new Date();
    const currentHour = now.getHours();
    const currentMinutes = now.getMinutes();
    const currentTimeInMinutes = currentHour * 60 + currentMinutes;

    if (currentHour >= 5 && currentHour < 20) {
      // Current time is in the day (5:00:00 to 20:00:00)
      this.currentTime = now.toLocaleTimeString('en-US', { hour12: false });

      if (!Array.isArray(this.BusyObject)) {
        //console.error('BusyObject data is not an array.');
        this.status = 'day';
        this.calculPriceForRace();
        return;
      }

      for (const event of this.BusyObject) {
        const startTime = new Date(`2000-01-01 ${event.startTime}`);
        const endTime = new Date(`2000-01-01 ${event.endTime}`);
        const startHour = startTime.getHours();
        const startMinutes = startTime.getMinutes();
        const startInMinutes = startHour * 60 + startMinutes;
        const endHour = endTime.getHours();
        const endMinutes = endTime.getMinutes();
        const endInMinutes = endHour * 60 + endMinutes;

        if (
          currentTimeInMinutes >= startInMinutes &&
          currentTimeInMinutes <= endInMinutes
        ) {
          this.status = 'busy';
          this.calculPriceForRace();
          return;
        }
      }

      // If no busy event matches the current time, it's still day
      this.status = 'day';
      this.calculPriceForRace();
    } else {
      // Current time is in the night (20:00:00 to 5:00:00)
      this.currentTime = now.toLocaleTimeString('en-US', { hour12: false });
      this.status = 'night';
      this.calculPriceForRace();
    }
  }

  ngOnChanges() {
    //this.onDestinationInput()
  }

  async onDestinationInput() {
    this.loading = true; // Show loading indicator
    this.showPrice = false;
    const geocoder = new google.maps.Geocoder();
    const options = {
      types: [],
      componentRestrictions: { country: 'tn' },
    };
    const autocomplete = new google.maps.places.Autocomplete(
      this.destinationInput.nativeElement,

      options
    );
    try {
      const [place] = await Promise.all([
        new Promise<google.maps.places.PlaceResult>((resolve, reject) => {
          autocomplete.addListener('place_changed', () => {
            const selectedPlace = autocomplete.getPlace();
            if (selectedPlace) {
              resolve(selectedPlace);
            } else {
              reject(new Error('No place selected.'));
            }
          });
        }),
        new Promise<void>((resolve) => {
          setTimeout(() => {
            resolve();
          }, 200); // Simulate some processing time
        }),
      ]);
      if (place.geometry && place.geometry.location) {
        //  center = { lat: 36.827497251728005, lng: 10.191852434472812 };

        // this.center = {
        //   lat: 36.827497251728005,
        //   lng: 10.191852434472812,
        // };
        this.markerPosition = {
          lat: place.geometry.location.lat(),
          lng: place.geometry.location.lng(),
        };
        // console.log(this.markerPosition, 'markerPosition');
        this.calculateDistance(
          this.markerPosition.lat,
          this.markerPosition.lng
        );
        const targetElement =
          this.elementRef.nativeElement.querySelector('#targetTag');
        if (targetElement) {
          targetElement.scrollIntoView({ behavior: 'smooth' });
        }
      }
    } catch (error) {
    } finally {
      this.loading = false; // Hide loading indicator
    }
    //  center = { lat: 36.827497251728005, lng: 10.191852434472812 };
  }
  /*onDestinationInput() {

    const geocoder = new google.maps.Geocoder();

    const options = {
      types: [],
      componentRestrictions: { country: 'tn' } // 'tn' is the country code for Tunisia
    };

    const autocomplete = new google.maps.places.Autocomplete(this.destinationInput.nativeElement, options);
    console.log("autocomplete",autocomplete);
    autocomplete.addListener('place_changed', async () => {
      const place = await autocomplete.getPlace();
      console.log('place',place);
      if (place.geometry && place.geometry.location) {
        this.loading = false;
        this.center = {
          lat: place.geometry.location.lat(),
          lng: place.geometry.location.lng(),
        };
        this.markerPosition = {
          lat: place.geometry.location.lat(),
          lng: place.geometry.location.lng(),
        };
        this.calculateDistance(this.markerPosition.lat, this.markerPosition.lng);
        const targetElement = this.elementRef.nativeElement.querySelector('#targetTag');
        if (targetElement) {
          targetElement.scrollIntoView({ behavior: 'smooth' });
        }

      }else {
        this.loading = false; // Handle error case and hide loading indicator
      }

    });

  }*/

  calculateDistance(latitude: any, longitude: any) {
    // console.log('hi')
    this.expectedPrice = null;
    const directionsService = new google.maps.DirectionsService();
    // Stafim Peugeot*

    this.lat1 = this.center.lat;
    this.long1 = this.center.lng;

    const lat2 = latitude;
    const lon2 = longitude;

    const origin = new google.maps.LatLng(this.lat1, this.long1);
    const destination = new google.maps.LatLng(lat2, lon2);
    const request = {
      origin: origin,
      destination: destination,
      travelMode: google.maps.TravelMode.DRIVING,
    };

    directionsService.route(request, (result, status) => {
      if (status === google.maps.DirectionsStatus.OK) {
        // console.log("result",result);

        this.polylinePath = [
          { lat: this.lat1, lng: this.long1 }, // Starting point
          { lat: this.markerPosition.lat, lng: this.markerPosition.lng }, // Destination point
        ];
        const bounds = new google.maps.LatLngBounds();
        bounds.extend(new google.maps.LatLng(this.lat1, this.long1)); // Point de départ
        bounds.extend(
          new google.maps.LatLng(
            this.markerPosition.lat,
            this.markerPosition.lng
          )
        ); // Point de destination

        // Mettez à jour la valeur du zoom pour afficher les deux points
        const zoom = this.calculateZoomToShowBounds(bounds, {
          width: 600,
          height: 400,
        }); // Ajustez la largeur et la hauteur au besoin
        const markerGeocoder = new google.maps.Geocoder();

        markerGeocoder.geocode({ location: destination }, (results, status) => {
          if (status === google.maps.GeocoderStatus.OK && results[0]) {
            // console.log(results[0], 'result');
            const region = results[0].address_components;
            let regionName = '';
            region.forEach((res: any) => {
              if (res.types[0] === 'administrative_area_level_1') {
                regionName = res.long_name;
                this.createCourseObject.idReg = this.getRegionId(
                  String(regionName)
                );
                // console.log( this.createCourseObject.idReg)
                this.getAllSettings(this.createCourseObject.idReg);
              }
            });
            // this.createCourseObject.idReg = this.getRegionId(
            //   String(regionName)
            // );
          }
        });
        this.zoom = zoom;
        const distanceInMeters = result.routes[0].legs[0].distance.value;
        const distanceInKm = distanceInMeters / 1000;
        const distanceInMiles = distanceInMeters * 0.000621371;
        this.expectedDistance = distanceInKm;
        this.adress = result.routes[0].legs[0].end_address;

        this.DurationExpected = parseInt(
          result.routes[0].legs[0].duration.text
        );
        // if (this.status === 'day') {
        //   /*      console.log('day',this.settingObject[0].parametervalue);
        //   console.log('day',(distanceInKm * parseFloat(this.settingObject[2].parametervalue)));
        //   console.log('day',this.expectedPrice);*/
        //   this.expectedPrice =
        //     parseFloat(this.settingObject[0].parametervalue) +
        //     distanceInKm * parseFloat(this.settingObject[1].parametervalue);
        //   console.log('day', this.expectedPrice);
        // } else if (this.status === 'busy') {
        //   /*console.log('busy',parseFloat(this.settingObject[0].parametervalue));
        //   console.log('busy',parseFloat(this.settingObject[2].parametervalue));
        //   console.log('busy',(distanceInKm ));*/
        //   this.expectedPrice =
        //     parseFloat(this.settingObject[0].parametervalue) +
        //     distanceInKm * parseFloat(this.settingObject[3].parametervalue);
        // } else {
        //   /* console.log('else',convertToNumber(this.settingObject[0].parametervalue));
        //   console.log('else',(distanceInKm * parseFloat(this.settingObject[2].parametervalue)));
        //   console.log('else',this.expectedPrice);*/
        //   this.expectedPrice =
        //     parseFloat(this.settingObject[0].parametervalue) +
        //     distanceInKm * parseFloat(this.settingObject[2].parametervalue);
        // }

        this.createCourseObject.distance = this.expectedDistance * 1000;
        this.createCourseObject.addressBegin =
          result.routes[0].legs[0].start_address;
        this.createCourseObject.addressEnd =
          result.routes[0].legs[0].end_address;
        this.createCourseObject.placeIdBegin =
          result.geocoded_waypoints[0].place_id;
        this.createCourseObject.placeIdEnd =
          result.geocoded_waypoints[1].place_id;
        this.createCourseObject.expectedTime = this.DurationExpected;
        this.createCourseObject.expectedPrice = parseFloat(
          this.expectedPrice?.toFixed(3)
        );
        // console.log(this.createCourseObject,'object1')

        //Stafim

        this.createCourseObject.latitudeBegin = this.center.lat;
        this.createCourseObject.longitudeBegin = this.center.lng;

        // Casino Djerba
        //this.createCourseObject.latitudeBegin = 33.85839074386289;
        //this.createCourseObject.longitudeBegin = 10.976566788630452;

        // Royal Garden
        //this.createCourseObject.latitudeBegin = 33.826837569050085;
        //this.createCourseObject.longitudeBegin = 11.017902642327801;

        // Djerba resort
        //this.createCourseObject.latitudeBegin = 33.83977776701574;
        //this.createCourseObject.longitudeBegin = 10.994112694478341;

        //Palm azure Djerba
        //this.createCourseObject.latitudeBegin = 33.76329632714767;
        //this.createCourseObject.longitudeBegin = 11.020111909222582;

        //Patio mezraya
        //this.createCourseObject.latitudeBegin = 33.86066944445947;
        //this.createCourseObject.longitudeBegin = 10.953717064860976;

        this.createCourseObject.latitudeEnd = this.markerPosition.lat;
        this.createCourseObject.longitudeEnd = this.markerPosition.lng;

        // Now you can use this.expectedPrice or any other logic that depends on distanceInKm here.
        // console.log(this.createCourseObject,'object')
      } else {
      }
    });
  }
  calculateZoomToShowBounds(
    bounds: google.maps.LatLngBounds,
    mapDim: { width: number; height: number }
  ): number {
    const WORLD_DIM = { height: 256, width: 256 };
    const ZOOM_MAX = 21;

    const ne = bounds.getNorthEast();
    const sw = bounds.getSouthWest();

    const latFraction = (this.rad(ne.lat()) - this.rad(sw.lat())) / Math.PI;

    const lngDiff = ne.lng() - sw.lng();
    const lngFraction = (lngDiff < 0 ? lngDiff + 360 : lngDiff) / 360;

    const latZoom = this.zoomFraction(latFraction, mapDim.height);
    const lngZoom = this.zoomFraction(lngFraction, mapDim.width);

    const zoom = Math.min(latZoom, lngZoom, ZOOM_MAX);

    return Math.floor(zoom);
  }

  rad(x: number): number {
    return (x * Math.PI) / 180;
  }

  zoomFraction(fraction: number, dimension: number): number {
    const WORLD_DIM = {
      height: 256,
      width: 256,
    };
    return Math.floor(
      Math.log(dimension / (fraction * WORLD_DIM.height)) / Math.LN2
    );
  }
  close() {
    this.ispopUpShow = false;
    this.ispopUpShowProfil = false;
    // this.numTel = Number(this.initialnumTel);
    this.reset();
    this.paiementType = '';
    this.isButtonDisabled = true;
  }

  ConfirmCourse() {
    if (
      this.createCourseObject.longitudeBegin == 0 &&
      this.createCourseObject.latitudeBegin == 0
    ) {
      this.ispopUpShow = false;
    } else {
      this.ispopUpShow = true;
    }
  }

  AcceptCourse() {
    this.createCourseObject.latitudeEnd = this.markerPosition.lat;
    this.createCourseObject.longitudeEnd = this.markerPosition.lng;
    // console.log(this.createCourseObject,'object',this.expectedPrice)
    this.createCourseObject.expectedPrice = Number(Number(this.expectedPrice).toFixed(3))
    if (!this.hasRequiredRole('ENTREPRISE_CLIENT')) {
      if (this.numTel.toString().length !== 8) {
        this.showErrorNumTel = true;
        this.toastr.error(
          'Svp le numéro et le choix de paiement sont obligatoires!'
        );
      } else {
        this.createCourseObject.numClientStafim = this.numTel.toString();

        this.courseService.verifNumber(String(this.numTel)).subscribe(
          (res: any) => {
            if (res.code == 200 && res.data.exist == true) {
              this.ispopUpShow = false;
              this.destination = '';
              const targetElement =
                this.elementRef.nativeElement.querySelector('#uptarget');

              if (targetElement) {
                targetElement.scrollIntoView({ behavior: 'smooth' });
              }
              this.expectedPrice = null;
              this.DurationExpected = 0;
              if (this.paiementType === 'Prise en charge partielle') {
                this.createCourseObject.treatmentType = 'POURCENTAGE';
                this.createCourseObject.poucentageValue = this.pourcentValue;
              }
              if (this.paiementType === 'Sans prise en charge') {
                this.createCourseObject.treatmentType = 'NONE';

                this.createCourseObject.poucentageValue = 0;
              }
              if (this.paiementType === 'Prise en charge total') {
                this.createCourseObject.treatmentType = 'ALL';
                this.createCourseObject.poucentageValue = 100;
              }
              this.courseService
                .AddCourse(this.createCourseObject)
                .subscribe((res: any) => {
                  if (res.code == 200) {
                    // this.expectedPrice = null;
                    // this.DurationExpected = 0;
                    this.toastr.success('la course a été bien crée');
                  } else if (res.msg === 'RaceNotEndedException') {
                    this.toastr.error(
                      "la course n'a pas été bien crée car il y a une course en cours"
                    );
                  } else if (res.msg === 'UnknownUserException') {
                    this.toastr.error("l'utilisateur n'est pas reconnu");
                  } else {
                    this.toastr.error("la course n'a pas été bien crée");
                  }
                });

              this.reset();
            }
            if (res.code == 200 && res.data.exist == false) {
              this.idClient = res.data.client.id;
              this.client = res.data.client;
              this.nom = this.client.firstName;
              this.prenom = this.client.lastName;
              this.email = this.client.email;

              this.ispopUpShowProfil = true;
            }
          },
          (error) => {}
        );
      }
    } else {
      if (this.numTel.toString().length !== 8) {
        this.showErrorNumTel = true;
        this.toastr.error(
          'Svp le numéro et le choix de paiement sont obligatoires!'
        );
      } else {
        this.createCourseObject.numClientStafim = this.numTel.toString();

        this.courseService.verifNumber(String(this.numTel)).subscribe(
          (res: any) => {
            if (res.code == 200 && res.data.exist == true) {
              this.ispopUpShow = false;
              this.destination = '';
              const targetElement =
                this.elementRef.nativeElement.querySelector('#uptarget');

              if (targetElement) {
                targetElement.scrollIntoView({ behavior: 'smooth' });
              }
              // this.expectedPrice = null;
              // this.DurationExpected = 0;
              // if (this.paiementType === 'Prise en charge partielle') {
              //   this.createCourseObject.treatmentType = 'POURCENTAGE';
              //   this.createCourseObject.poucentageValue = this.pourcentValue;
              // }
              // if (this.paiementType === 'Sans prise en charge') {
              //   this.createCourseObject.treatmentType = 'NONE';

              //   this.createCourseObject.poucentageValue = 0;
              // }
              // if (this.paiementType === 'Prise en charge total') {
              //   this.createCourseObject.treatmentType = 'ALL';
              //   this.createCourseObject.poucentageValue = 100;
              // }
              this.createCourseObject.poucentageValue = 0;
              this.createCourseObject.treatmentType = 'NONE';
              // console.log(this.createCourseObject, 'object');
              this.courseService
                .AddCourse(this.createCourseObject)
                .subscribe((res: any) => {
                  if (res.code == 200) {
              //         this.expectedPrice = null;
              // this.DurationExpected = 0;
                    this.toastr.success('la course a été bien crée');
                  } else if (res.msg === 'RaceNotEndedException') {
                    this.toastr.error(
                      "la course n'a pas été bien crée car il y a une course en cours"
                    );
                  } else if (res.msg === 'UnknownUserException') {
                    this.toastr.error("l'utilisateur n'est pas reconnu");
                  } else {
                    this.toastr.error("la course n'a pas été bien crée");
                  }
                });

              this.reset();
            }
            if (res.code == 200 && res.data.exist == false) {
              this.idClient = res.data.client.id;
              this.client = res.data.client;
              this.nom = this.client.firstName;
              this.prenom = this.client.lastName;
              this.email = this.client.email;

              this.ispopUpShowProfil = true;
            }
          },
          (error) => {}
        );
      }
    }
    // if (this.numTel.toString().length !== 8 ) {
    //   this.showErrorNumTel = true;
    //   this.toastr.error("Svp le numéro et le choix de paiement sont obligatoires!")
    // } else {

    //   this.createCourseObject.numClientStafim = this.numTel.toString();

    //   this.courseService.verifNumber(String(this.numTel)).subscribe(
    //     (res: any) => {
    //       console.log(res, 'res');
    //       if (res.code == 200 && res.data.exist == true) {
    //         this.ispopUpShow = false;
    //         this.destination = '';
    //         const targetElement =
    //           this.elementRef.nativeElement.querySelector('#uptarget');

    //         if (targetElement) {
    //           targetElement.scrollIntoView({ behavior: 'smooth' });
    //         }
    //         this.expectedPrice = 0;
    //         this.DurationExpected = 0;
    //         if (this.paiementType === 'Prise en charge partielle') {
    //           this.createCourseObject.treatmentType = 'POURCENTAGE';
    //           this.createCourseObject.poucentageValue = this.pourcentValue;
    //         }
    //         if (this.paiementType === 'Sans prise en charge') {
    //           this.createCourseObject.treatmentType = 'NONE';

    //           this.createCourseObject.poucentageValue = 0;
    //         }
    //         if (this.paiementType === 'Prise en charge total') {
    //           this.createCourseObject.treatmentType = 'ALL';
    //           this.createCourseObject.poucentageValue = 100;
    //         }
    //         console.log(this.createCourseObject, 'courseObject');
    //         this.courseService
    //           .AddCourse(this.createCourseObject)
    //           .subscribe((res) => {
    //             this.toastr.success('la course a été bien crée');
    //           });
    //         this.toastr.success('Course crée avec succées', 'Succées', {
    //           closeButton: true,
    //         });
    //         this.reset()
    //       }
    //       if (res.code == 200 && res.data.exist == false) {
    //         this.idClient = res.data.client.id;
    //         this.client = res.data.client
    //         this.nom = this.client.firstName
    //         this.prenom =this.client.lastName
    //         this.email =this.client.email
    //         console.log('hiiiiiiiiiiiii',this.nom,this.prenom,this.email);

    //         this.ispopUpShowProfil = true;
    //       }

    //     },
    //     (error) => {
    //       console.log('error');
    //     }
    //   );
    // }
  }

  reset() {
    //this.numTel.empty
    this.showPrice = false;
    this.destination = '';
    this.ngOnInit();
    this.nom = '';
    this.email = '';
    this.email = '';
    this.showErrorNumTel = false;
    this.pourcentValue = 0;
    this.paiementType = '';
    this.adress = '';
    this.DurationExpected = 0;
    this.expectedDistance = 0;
    this.expectedPrice = null;
    this.polylinePath = [];
    this.numTel = 0;
    //Stafim

    // Casino Djerba
    //this.center = { lat: 33.85839074386289, lng: 10.976566788630452 };

    //Royal Garden
    //this.center = { lat: 33.83977776701574, lng: 10.994112694478341 };

    // Djerba Resort
    //this.center = { lat: 33.839799325099634, lng: 10.994125596351044 };

    // Palm azure Djerba
    //this.center = { lat: 33.76329632714767, lng: 11.020111909222582 };

    // Patio mezraya
    //this.center = { lat: 33.86066944445947, lng: 10.953717064860976};
    this.createCourseObject = {
      placeIdBegin: '',
      addressBegin: '',
      latitudeBegin: 0,
      longitudeBegin: 0,
      placeIdEnd: '',
      addressEnd: '',
      latitudeEnd: 0,
      longitudeEnd: 0,
      distance: 0,
      expectedTime: 0,
      expectedPrice: 0,
      numClientStafim: '',
      //Stafim
      // "idAgent":Number(localStorage.getItem('agent_id')),
      //Casino
      //"numEntreprise":"77885500",
      //Gardin
      //"numEntreprise":"77885511",
      //Resort
      //"numEntreprise":"77885522",
      //MarieCurie
      //"numEntreprise":"77885533",
      //PalmAzure
      //"numEntreprise":"77885555",
      //PatioMezraya
      //"numEntreprise":"77885566",
      idReg: 1,
      poucentageValue: 0,
      treatmentType: '',
    };
    const targetElement =
      this.elementRef.nativeElement.querySelector('#uptarget');
    this.zoom = 15;
    if (targetElement) {
      targetElement.scrollIntoView({ behavior: 'smooth' });
    }
  }

  // checkInputLength() {
  //   console.log(this.paiementType,'paiment')
  //   if(this.numTel.toString().length == 8 && (this.paiementType =='Prise en charge total' ||this.paiementType =='Sans prise en charge' ||(this.paiementType =='Prise en charge partielle' && (this.pourcentValue != 0 && this.pourcentValue!=100 &&this.pourcentValue &&this.pourcentValue < 100 &&this.pourcentValue > 0)) ) ){
  //     this.isButtonDisabled =false ;

  //   } else {
  //     this.isButtonDisabled =true
  //   }

  // }
  paimentTypeFunction(type: any) {
    this.pType = type;
  }
  checkInputLength() {
    if (!this.hasRequiredRole('ENTREPRISE_CLIENT')) {
      if (
        this.numTel.toString().length == 8 &&
        this.paiementType == 'Prise en charge total'
      ) {
        this.isButtonDisabled = false;
      } else if (
        this.numTel.toString().length == 8 &&
        this.paiementType == 'Sans prise en charge'
      ) {
        this.isButtonDisabled = false;
      } else if (
        this.numTel.toString().length == 8 &&
        this.paiementType == 'Prise en charge partielle' &&
        this.pourcentValue != 0 &&
        this.pourcentValue != 100 &&
        this.pourcentValue &&
        this.pourcentValue < 100 &&
        this.pourcentValue > 0
      ) {
        this.isButtonDisabled = false;
      } else {
        this.isButtonDisabled = true;
      }
    } else {
      if (this.numTel.toString().length == 8) {
        this.isButtonDisabled = false;
      }
    }
  }

  checkFormValidity() {
    if (
      this.nom != '' &&
      this.nom != null &&
      this.prenom != null &&
      this.prenom != ''
    ) {
      if (
        this.email != null &&
        this.showEmail == false &&
        this.emailEmpty == false
      ) {
        this.creationDisabled = false;
      } else if (this.showEmail == false) {
        this.creationDisabled = false;
      } else if (this.showEmail == true && this.emailEmpty == false) {
        this.creationDisabled = true;
      } else if (this.showEmail == true && this.emailEmpty == true) {
        this.creationDisabled = false;
      }
    } else {
      this.creationDisabled = true;
    }
  }

  isValidEmail() {
    // Utilisation d'une expression régulière pour valider l'adresse e-mail
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    if (emailRegex.test(this.email) === false) {
      this.showEmail = true;
    } else {
      this.showEmail = false;
    }
  }
  emailInput(event: any) {
    if (event == '') {
      this.emailEmpty = true;
    }
  }
  CreateAccount() {
    if (!this.hasRequiredRole('ENTREPRISE_CLIENT')) {
      this.ispopUpShow = false;
      if (!this.email) {
        this.email = '';
      }
      let dataUpdateClient = {
        firstName: this.nom,
        lastName: this.prenom,
        email: this.email,
      };

      this.courseService
        .UpdateClient(dataUpdateClient, this.idClient)
        .subscribe((res) => {
          this.toastr.success(
            'les informations de client ont été ajoutés avec succés'
          );
        });

      if (this.paiementType === 'Prise en charge partielle') {
        this.createCourseObject.treatmentType = 'POURCENTAGE';
        this.createCourseObject.poucentageValue = this.pourcentValue;
      }
      if (this.paiementType === 'Sans prise en charge') {
        this.createCourseObject.treatmentType = 'NONE';

        this.createCourseObject.poucentageValue = 0;
      }
      if (this.paiementType === 'Prise en charge total') {
        this.createCourseObject.treatmentType = 'ALL';
        this.createCourseObject.poucentageValue = 100;
      }

      this.courseService
        .AddCourse(this.createCourseObject)
        .subscribe((res: any) => {
          if (res.code == 200) {
            this.toastr.success('la course a été bien crée');
          } else if (res.msg === 'RaceNotEndedException') {
            this.toastr.error(
              "la course n'a pas été bien crée car il y a une course en cours"
            );
          } else if (res.msg === 'UnknownUserException') {
            this.toastr.error("l'utilisateur n'est pas reconnu");
          } else {
            this.toastr.error("la course n'a pas été bien crée");
          }
        });

      this.reset();
      this.ispopUpShowProfil = false;
      this.toastr.success('Le compte a été crée');
    } else {
      this.ispopUpShow = false;
      if (!this.email) {
        this.email = '';
      }
      let dataUpdateClient = {
        firstName: this.nom,
        lastName: this.prenom,
        email: this.email,
      };
      // console.log(dataUpdateClient, 'data', this.idClient, 'idclient');
      this.courseService
        .UpdateClient(dataUpdateClient, this.idClient)
        .subscribe((res) => {
          this.toastr.success(
            'les informations de client ont été ajoutés avec succés'
          );
        });
      this.createCourseObject.treatmentType = 'NONE';

      this.createCourseObject.poucentageValue = 0;

      this.courseService
        .AddCourse(this.createCourseObject)
        .subscribe((res: any) => {
          if (res.code == 200) {
            this.toastr.success('la course a été bien crée');
          } else if (res.msg === 'RaceNotEndedException') {
            this.toastr.error(
              "la course n'a pas été bien crée car il y a une course en cours"
            );
          } else if (res.msg === 'UnknownUserException') {
            this.toastr.error("l'utilisateur n'est pas reconnu");
          } else {
            this.toastr.error("la course n'a pas été bien crée");
          }
        });

      this.reset();
      this.ispopUpShowProfil = false;
      this.toastr.success('Le compte a été crée');
    }
  }
  resetForm() {
    this.nom = '';
    this.prenom = '';
    this.email = '';
    this.agent = false;
    this.paiementType = '';
  }

  getRegionId(region: string) {
    // console.log(region, 'region');
    region = region.toLowerCase();

    if (
      region.includes('gabès') ||
      region.includes('gabès') ||
      region.includes('قابس')
    ) {
      return 10;
    } else if (
      region.includes('gafsa') ||
      region.includes('gafsa') ||
      region.includes('قفصة')
    ) {
      return 9;
    } else if (
      region.includes('sfax') ||
      region.includes('sfax') ||
      region.includes('صفاقس')
    ) {
      return 8;
    } else if (
      region.includes('nabeul') ||
      region.includes('nabeul') ||
      region.includes('نابل')
    ) {
      return 7;
    } else if (
      region.includes('kairouan') ||
      region.includes('kairouan') ||
      region.includes('القيروان')
    ) {
      return 6;
    } else if (
      region.includes('monastir') ||
      region.includes('monastir') ||
      region.includes('المنستير')
    ) {
      return 5;
    } else if (
      region.includes('sousse') ||
      region.includes('sousse') ||
      region.includes('سوسة')
    ) {
      return 4;
    } else if (
      region.includes('bizerte') ||
      region.includes('bizert') ||
      region.includes('بنزرت')
    ) {
      return 3;
    } else if (
      region.includes('médenine') ||
      region.includes('houmt souk') ||
      region.includes('djerba') ||
      region.includes('medenine') ||
      region.includes('medenin') ||
      region.includes('مدنين')
    ) {
      return 2;
    } else {
      return 1;
    }
  }
}
