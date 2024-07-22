import {
  ChangeDetectorRef,
  Component,
  ElementRef,
  OnInit,
  SimpleChanges,
  ViewChild,
} from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AgencyService } from 'src/app/Shared/Services/agency.service';
import { StorageService } from 'src/app/Shared/Services/storage.service';
import { __await } from 'tslib';

@Component({
  selector: 'app-societe',
  templateUrl: './societe.component.html',
  styleUrls: ['./societe.component.css'],
})
export class SocieteComponent implements OnInit {
  polylinePath: Array<{ lat: number; lng: number }> = [];

  @ViewChild('destinationInputs') destinationInputs: ElementRef;
  @ViewChild('target') targetElement!: ElementRef;
  idInputTable = [];
  idInput = new Set<number>();
  marker: google.maps.Marker;
  placeId: string;
  destination: string;
  expectedDistance: any;
  adressPop = '';
  tableMarker = [];
  addLogos = [];
  peugeot = false;
  citroen = false;
  opel = false;
  showMapMarker = false;
  DurationExpected: any;
  add = true;
  nom = '';
  zoom = 18;
  loading = false;
  adress = '';
  modifier = false;
  page: number = 1;
  pageSize: number = 10;
  totalPages: number = 0;
  agency: any;
  i = 0;
  markerPosition: google.maps.LatLngLiteral;
  distanceKm: number;
  directionsResult: google.maps.DirectionsResult;
  directionsRenderer: google.maps.DirectionsRenderer;
  ispopUpShowProfil: boolean = false;
  logos = [];
  updateLogos = [];
  prenom: string = '';
  agent: boolean = false;
  checkNumber: boolean = false;
  currentTime: string = '';
  ErrorMessage: boolean = false;
  status: string = '';
  showPop = false;
  done = 'done';
  center = { lat: 33.892166, lng: 9.561555499999997 };
  latitude: any;
  longitude: any;
  show = localStorage.getItem('show');
  data = {
    intitule: '',
    idLogos: [],
    addressDTO: {
      libelle: '',
      placeId: '',
      address: '',
      longitude: 0,
      latitude: 0,
      adressType: 'TRAVAILLE',
    },
  };
  markerClientIcon: google.maps.MarkerOptions = {
    draggable: false,
    icon: {
      url: 'assets/pinClient.png',
      scaledSize: {
        width: 35,
        height: 37,

        equals: function (other: google.maps.Size): boolean {
          throw new Error('Function not implemented.');
        },
      },
    },
  };
  markerClientIconGreen = {
    draggable: true,
    icon: {
      url: 'assets/pinClient.png',
      scaledSize: {
        width: 35,
        height: 37,
      },
    },
  };
  dataUpdate: any;
  constructor(
    private toastr: ToastrService,
    private agencyService: AgencyService,
    private readonly elementRef: ElementRef,
    private sanitizer: DomSanitizer
  ) {
    this.logos = JSON.parse(localStorage.getItem('logos'));
    this.addLogos = this.logos;
  }

  ngOnInit(): void {
    this.findAllAgency();
    // this.getLocation();
    // console.log(this.center, 'center');
  }

  showSociete() {
    this.add = true;
    this.addLogos.forEach((res: any) => {
      delete res.checked;
    });
    this.modifier = false;
    this.reset();
  }
  addAgency() {
    this.data.intitule = this.nom;
    this.data.addressDTO.latitude = this.center.lat;
    this.data.addressDTO.longitude = this.center.lng;
    this.data.addressDTO.address = this.adress;
    this.data.addressDTO.placeId = this.placeId;
    this.data.addressDTO.libelle = this.adress;
    this.data.addressDTO.adressType = 'TRAVAILLE';
    this.data.idLogos = this.idInputTable;
    this.addLogos.forEach((res: any) => {
      this.idInputTable.forEach((resId: any) => {
        if (res.id === resId) {
          res.checked = 'checked';

          res.checked = true;
        }
      });
    });
    // console.log(this.addLogos, 'addlogos');
    this.agencyService.addAgency(this.data).subscribe((res) => {
      this.toastr.success("L'ajout de l'agence a été fait avec succés");
      this.resetAdd();
    });
  }

  // get location of my pc
  // getLocation(): void {
  //   if (navigator.geolocation) {
  //     navigator.geolocation.getCurrentPosition(
  //       (position) => {
  //         this.latitude = position.coords.latitude;
  //         this.longitude = position.coords.longitude;
  //         this.center.lat = this.latitude;
  //         this.center.lng = this.longitude;
  //         console.log(
  //           `Latitude: ${this.latitude}, Longitude: ${this.longitude}`
  //         );
  //       },
  //       (error) => {
  //         console.error('Error getting location:', error);
  //       }
  //     );
  //   } else {
  //     console.error('Geolocation is not supported by this browser.');
  //   }
  // }
  showMap() {
    this.showPop = true;
  }
  closeMap() {
    if (this.adressPop && this.modifier === true) {
      this.adress = this.adressPop;
    }
    if (!this.adressPop && this.add === true) {
      this.adress = '';
    }
    this.showPop = false;

    this.resetMap();
  }
  handlePageChange(event) {
    this.page = event;
    this.findAllAgency();
  }

  findAllAgency() {
    this.agencyService
      .getAllAgency(this.page - 1, this.pageSize)
      .subscribe((res: any) => {
        // console.log(res, 'res');
        this.agency = res.data.content;

        this.totalPages = res.data.totalElements;
      });
  }
  positionCenter(event: any) {
    // console.log(event, 'evenrt');
  }
  update(agence: any) {
    this.idInputTable = [];
    
    this.updateLogos.forEach((res: any) => {
      delete res.checked;
    });

    this.updateLogos = this.logos;

    agence?.logos.forEach((res: any) => {
      this.idInputTable.push(res.id);
      this.idInput.add(res.id)
    });
    // console.log(this.idInputTable,'table')
    this.add = false;
    this.modifier = true;
    this.dataUpdate = agence;
    this.nom = agence.intitule;
    this.adress = agence.address?.libelle;
    this.adressPop = agence.address?.libelle;
    this.center.lat = agence.address?.latitude;
    (this.center.lng = agence.address?.longitude),
      (this.placeId = agence.address?.placeId);
    this.data.addressDTO.adressType = 'TRAVAILLE';
    
    this.data.idLogos = this.idInputTable;
    if (this.idInputTable) {
      this.updateLogos.forEach((res: any) => {
        this.idInputTable.forEach((resId: any) => {
          if (res.id === resId) {
            res.checked = 'checked';

            res.checked = true;
          }
        });
      });
    }
    // console.log(this.updateLogos, 'update');
  }

  updateAgency() {
    this.data.intitule = this.nom;
    this.data.addressDTO.libelle = this.adress;
    this.data.addressDTO.latitude = this.center.lat;
    this.data.addressDTO.longitude = this.center.lng;
    this.data.addressDTO.address = this.adress;
    this.data.addressDTO.placeId = this.placeId;
    this.data.addressDTO.adressType = 'TRAVAILLE';
    this.data.idLogos = this.idInputTable;
    // console.log(this.data, 'adressDtoUpdate');
    this.agencyService
      .updateAgency(this.data, this.dataUpdate.id)
      .subscribe((res) => {
        this.toastr.success('La modification a été faite avec succés');
        this.reset();
      });
  }

  block(agence: any) {
    // console.log(agence, 'agence');
    this.agencyService.deleteAgency(agence.id).subscribe((res) => {
      this.toastr.success(`L'agence ${agence.intitule} est suprrimée`);
      this.reset();
    });
  }
  position() {
    // console.log(this.center, 'center');
    this.showPop = false;
    this.resetMap();
  }
  resetAdd() {
    this.nom = '';
    this.adress = '';
    this.addLogos.forEach((res: any) => {
      delete res.checked;
    });
    this.findAllAgency();
  }
  reset() {
    this.findAllAgency();
    this.add = true;
    this.modifier = false;
    this.nom = '';
    this.adress = '';
    this.dataUpdate = {};
    this.addLogos.forEach((res: any) => {
      delete res.checked;
    });
  }

  async onDestinationInput(map: google.maps.Map) {
    this.loading = true; // Show loading indicator

    const geocoder = new google.maps.Geocoder();
    const options = {
      types: [],
      componentRestrictions: { country: 'tn' },
    };
    const autocomplete = new google.maps.places.Autocomplete(
      this.destinationInputs.nativeElement,
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
        this.marker = new google.maps.Marker({
          position: {
            lat: place.geometry.location.lat(),
            lng: place.geometry.location.lng(),
          },
          map: map, // Use the passed map instance
          draggable: true,
        });
        this.center = {
          lat: place.geometry.location.lat(),
          lng: place.geometry.location.lng(),
        };

        // console.log(this.center, 'markerPosition');
        this.calculateDistance(this.center.lat, this.center.lng);
        const targetElement =
          this.elementRef.nativeElement.querySelector('#targetTag');
        if (targetElement) {
          targetElement.scrollIntoView({ behavior: 'smooth' });
        }

        this.marker.addListener('dragend', () => {
          // Update the input value when the marker is dragged

          // Update the center position when the marker is dragged
          this.center = {
            lat: this.marker.getPosition().lat(),
            lng: this.marker.getPosition().lng(),
          };

          // Do something with the marker position, e.g., calculate distance
          this.calculateDistance(
            this.marker.getPosition().lat(),
            this.marker.getPosition().lng()
          );
        });

        map.setCenter(this.marker.getPosition());
      }
    } catch (error) {
    } finally {
      this.loading = false; // Hide loading indicator
    }
  }
  onMarkerDragEnd(event: any) {
    this.center.lat = event.coords.lat;
    this.center.lng = event.coords.lng;
  }
  onMapClick(event: any) {
    if (event) {
      this.showMapMarker = true;
      this.center.lat = event.latLng.lat();
      this.center.lng = event.latLng.lng();
      this.calculateDistance(this.center.lat, this.center.lng);
      // console.log(this.adress, 'adressMapClick');
    }
  }
  resetMap() {
    // this.getLocation();
  }

  calculateDistance(latitude: any, longitude: any) {
    const directionsService = new google.maps.DirectionsService();

    const lat2 = latitude;
    const lon2 = longitude;

    const origin = new google.maps.LatLng(this.center.lat, this.center.lng);
    const destination = new google.maps.LatLng(lat2, lon2);
    const request = {
      origin: origin,
      destination: destination,
      travelMode: google.maps.TravelMode.DRIVING,
    };

    directionsService.route(request, (result, status) => {
      if (status === google.maps.DirectionsStatus.OK) {
        const bounds = new google.maps.LatLngBounds();
        bounds.extend(new google.maps.LatLng(this.center.lat, this.center.lng)); // Point de départ
        bounds.extend(new google.maps.LatLng(this.center.lat, this.center.lng)); // Point de destination

        // Mettez à jour la valeur du zoom pour afficher les deux points
        // const zoom = this.calculateZoomToShowBounds(bounds, {
        //   width: 600,
        //   height: 400,
        // });

        // this.zoom = zoom;
        const distanceInMeters = result.routes[0].legs[0].distance.value;
        const distanceInKm = distanceInMeters / 1000;
        const distanceInMiles = distanceInMeters * 0.000621371;
        this.expectedDistance = distanceInKm;
        // console.log(result.routes[0], 'adresse');
        this.adress = result.routes[0].legs[0].end_address;
        this.placeId = result.geocoded_waypoints[0].place_id;
        this.DurationExpected = parseInt(
          result.routes[0].legs[0].duration.text
        );

        // Now you can use this.expectedPrice or any other logic that depends on distanceInKm here.
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

  //opel check
  opels(event: any) {
    // console.log(event.target.checked, 'opel');
    this.opel = event.target.checked;
  }

  peugeots(event: any) {
    if (event.target.checked === false) {
      this.idInput.delete(Number(event.target.value));
      this.idInputTable = Array.from(this.idInput);
    }
    if (event.target.checked === true && !this.idInput.has(event.target.id)) {
      this.idInput.add(Number(event.target.value));
      this.idInputTable = Array.from(this.idInput);
    }
    // console.log(this.idInputTable);
  }

  handleImageError(event: any) {
    // console.error('Error loading image:', event);
  }
  getSafeImageUrl(url: string) {
    return this.sanitizer.bypassSecurityTrustUrl(url);
  }
}
