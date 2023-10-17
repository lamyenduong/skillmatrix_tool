import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { FormService } from '../../services/form/form.service';
import { ReadFileService } from 'src/app/services/read-file.service';
import { CookieService } from '../../services/cookie.service';
import { DomainService } from '../../services/form/domain.service';
import { SkillService } from '../../services/form/skill.service';
import { Domain } from 'src/app/models/domain.model';
import { Skill } from 'src/app/models/skill.model';
import { User } from 'src/app/models/user.model';
import { Form } from '../../models/form.model';
import { DataService } from 'src/app/services/data.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.sass'],
  encapsulation: ViewEncapsulation.None
})
export class HomeComponent implements OnInit {
  filePath: string = "../../../assets/file/WSI_SkillMatrix.xlsx"
  points = [0, 1, 2, 3, 4, 5]
  formsOwner!: Form[]
  formsAssign!: Form[]
  domains!: Domain[]
  skills!: Skill[]
  homePageText: any
  selectedValue!: number
  user!: User | null
  searchContext!: string;
  date!: Date
  domain!: Domain
  skill!: Skill

  constructor(private formService: FormService,
    private domainService: DomainService,
    private skillService: SkillService,
    private router: Router,
    private readFileService: ReadFileService,
    private cookieService: CookieService,
    private dataService: DataService) {
  }

  ngOnInit(): void {
    const user_id = this.cookieService.getCookie("user_id");
    this.formService.getFormOwner(user_id).subscribe((data: Form[]) => this.formsOwner = data);
    this.formService.getFormJoinInByUser(user_id).subscribe((data: Form[]) => this.formsAssign = data);
    this.domainService.getAllSkillDomains().subscribe((data: Domain[]) => {
      if (data) {
        this.domains = data
        this.domains.map((domain: Domain) => {
          if (domain && domain.domain_id && domain.domain_name) {
            this.domain = domain
            this.domain.domain_id = domain.domain_id
            this.domain.domain_name = domain.domain_name
          }
        })
      }
    });
    this.skillService.getAllSkills().subscribe((data: Skill[]) => {
      if (data) {
        this.skills = data
        this.skills.map((skill: Skill) => {
          if (skill && skill.skill_name && skill.skill_domain && skill.skill_domain?.domain_id) {
            this.skill = skill
            this.skill.skill_name = skill.skill_name
            if (this.skill.skill_domain)
              this.skill.skill_domain.domain_id = skill.skill_domain.domain_id
          }
        })
      }

    })
  }

  getFormOwnerByMe(form_id: string) {
    this.router.navigate(['/search', form_id]);
  }

  getFormAssignMe(form_id: string) {
    this.router.navigate(['/detail', form_id]);
  }

  //Upload File  
  displayUploadButton!: boolean
  displayAddDomainButton!: boolean
  displayEditDomainButton!: boolean
  isDragOver = false;
  fileSelected = false;
  droppedFile: File | null = null;
  showUploadDialog() {
    this.displayUploadButton = true;
  }
  onFileInputChange(event: any): void {
    const fileInput = event.target;
    if (fileInput.files && fileInput.files.length > 0) {
      this.fileSelected = true;
      const fileName = fileInput.files[0].name;
      const label = document.querySelector('#fileLabel') as HTMLLabelElement;
      label.innerText = fileName;
    } else {
      this.fileSelected = false;
    }
  }
  onFileDrop(event: any): void {
    event.preventDefault();
    this.isDragOver = false;
    const files = event.dataTransfer.files;
    if (files.length > 0) {
      this.droppedFile = files[0];
      const fileName = this.droppedFile?.name;
      if (fileName) {
        const label = document.querySelector('#fileLabel') as HTMLLabelElement;
        label.innerText = fileName;
        this.fileSelected = true;
      }
    }
  }
  onDragOver(event: any): void {
    event.preventDefault();
    this.isDragOver = true;
  }
  onDragLeave(event: any): void {
    event.preventDefault();
    this.isDragOver = false;
  }
  onUploadFile() {
    if (this.droppedFile) {
      this.manageExcelFile(this.droppedFile)
    } else {
      const fileInput = document.querySelector("#file") as HTMLInputElement;
      const filesToUpload = fileInput.files;
      if (filesToUpload && filesToUpload.length > 0) {
        const uploadedFile = filesToUpload[0];
        this.manageExcelFile(uploadedFile)
      } else {
        console.log("No file selected for upload.");
      }
    }
  }
  manageExcelFile(file: File) {
    this.readFileService.readFile(file)
      .then((resultArray: any[]) => {
        // Name
        const names = resultArray.map(row => row[0])
        const name: any[] = []
        for (let i = 0; i < names.length; i++) {
          if (names[i] !== undefined && typeof names[i] === 'string' && names[i].toLowerCase() !== 'employee') {
            name.push(names[i])
          }
        }
        //Team
        const teams = resultArray.map(row => row[1])
        const team: any[] = []
        for (let i = 0; i < teams.length; i++) {
          if (teams[i] !== undefined && typeof teams[i] === 'string' && teams[i].toLowerCase() !== 'team') {
            team.push(teams[i])
          }
        }
        const setTeam = [...new Set(team)]
        //Domain
        console.log(resultArray)
        const domain: any[] = []
        this.getJoinInDomain(2, 5, resultArray, domain) //soft skill
        this.getJoinInDomain(6, 28, resultArray, domain)
        console.log(domain)

        const data = {
          setTeam: setTeam,
          name: name,
          domain: domain
        }
        this.dataService.setData(data)
        this.router.navigate(['/create'])
      })
      .catch(error => {
        console.error("Error reading input file:", error);
      });
  }
  getJoinInDomain(startCol: number, endCol: number, arr: any[], data: any[]) {
    let sum = 0;
    let startRow = 2
    let endRow = arr.length - 1;
    while (sum <= 0 && endRow > startRow) {
      for (let col = startCol; col <= endCol; col++) {
        sum += arr[endRow][col];
      }
      if (sum <= 0) {
        endRow--;
      }
    }
    if (sum === 0) {
      for (let col = startCol; col <= endCol; col++) {
        arr[0][col] = null;
      }
    } else if (sum > 0) {
      data.push(arr[0][startCol]);
    }
  }

  //Search form
  searchForm(event: any) {
    // if (this.formService.)
  }

  //Search domain
  searchDomain(e: any) {
    const searchContext = e.target.value;
    this.domainService.getAllSkillDomains().subscribe((data: Domain[]) => {
      if (data) {
        this.domains = data
        this.domains.map((domain: Domain) => {
          if (domain && domain.domain_name) {
            this.domain.domain_name = domain.domain_name
            if (this.domain.domain_name.toLowerCase() === searchContext.toLowerCase()) {
              this.domains.push(domain)
            }
          }
        })
      }
    });
  }
  //Domain tabpanel
  removePanel() {
  }

  //Add domain button 
  showAddDomainDialog() {
    this.displayAddDomainButton = true
  }
  domain1!: Domain
  showEditDomainDialog(domain_id: string) {
    this.displayEditDomainButton = true
    //this.domainService.getDomainById(domain_id).subscribe((data: SkillDomain) => this.domain1 = data)
  }
}