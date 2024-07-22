/* tslint:disable */
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { StorageService } from './Shared/Services/storage.service';
import { SettingService } from './Shared/Services/setting.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  title = 'StafimPeugeot';
  url: string;
  apiKey = '';
  version!: string;
  constructor(
    private route: ActivatedRoute,
    public router: Router,
    private storageService: StorageService,
    private settingService: SettingService
  ) {}

  ngOnInit() {
    const v = `$ssss1ssss`; // Récupérer la date depuis votre source de données
    localStorage.setItem('deployedDate', v);
    // this.getApiKey();
    this.router.events.subscribe((event: any) => {
      if (event instanceof NavigationEnd) {
        this.url = this.router.url;
      }
    });
  }

  logout() {
    this.storageService.remove();
    this.router.navigate(['login']);
  }
  getApiKey() {
    this.settingService.fetchApiKey().subscribe((res: any) => {
      this.apiKey = res.data;
      localStorage.setItem('e', this.obfuscateApiKey(res.data));
    });
  }
  obfuscateApiKey(apiKey) {
    const apiKeyArray = apiKey.split(''); // Convert API key string to an array of characters
    const obfuscatedArray = apiKeyArray.map((char) =>
      String.fromCharCode(char.charCodeAt(0) + 1)
    ); // Shift each character by 1 ASCII value
    const obfuscatedApiKey = obfuscatedArray.join(''); // Convert the obfuscated array back to a string
    return obfuscatedApiKey;
  }
}
