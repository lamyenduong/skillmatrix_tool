import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { Router } from '@angular/router';
import { ConfirmEventType, ConfirmationService, MessageService } from 'primeng/api';
import { FormService } from '../../services/form/form.service';
import { ReadFileService } from 'src/app/services/read-file.service';
import { CookieService } from '../../services/cookie.service';
import { DomainService } from '../../services/form/domain.service';
import { SkillService } from '../../services/form/skill.service';
import { DataService } from 'src/app/services/data.service';
import { Domain } from 'src/app/models/domain.model';
import { Skill } from 'src/app/models/skill.model';
import { User } from 'src/app/models/user.model';
import { Form } from '../../models/form.model';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.sass'],
  encapsulation: ViewEncapsulation.None
})
export class HomeComponent implements OnInit {
  activeIndex: number = 0;
  filePath: string = "../../../assets/file/WSI_SkillMatrix.xlsx"
  points = [0, 1, 2, 3, 4, 5]
  formsOwner!: Form[]
  formsAssign!: Form[]
  domains!: Domain[]
  skills!: Skill[]
  skill!: Skill
  homePageText: any
  selectedValue!: number
  user!: User | null
  searchContext!: string;
  date!: Date
  domain: Domain = {
    domain_id: '',
    domain_name: ''
  }
  domainDetail: Domain = {
    domain_id: '',
    domain_name: ''
  }
  displayUploadButton!: boolean
  displayAddDomainButton!: boolean
  displayEditDomainButton!: boolean
  isDragOver = false;
  fileSelected = false;
  droppedFile: File | null = null;
  panelStates: boolean[] = [];


  constructor(private formService: FormService,
    private domainService: DomainService,
    private skillService: SkillService,
    private router: Router,
    private messageService: MessageService,
    private readFileService: ReadFileService,
    private cookieService: CookieService,
    private dataService: DataService,
    private confirmationService: ConfirmationService,) {
  }

  ngOnInit(): void {
    const user_id = this.cookieService.getCookie("user_id");
    this.formService.getFormOwner(user_id).subscribe((data: Form[]) => this.formsOwner = data);
    this.formService.getFormJoinInByUser(user_id).subscribe((data: Form[]) => this.formsAssign = data);
    this.domainService.getAllSkillDomains().subscribe((data: Domain[]) => {
      if (data) {
        this.domains = data
        this.domains.forEach((domain: any) => {
          if (domain && domain._id && domain.domain_name) {
            this.domain = domain
            this.domain.domain_id = domain._id
            this.domain.domain_name = domain.domain_name
          }
        })
        this.panelStates = this.domains.map(() => true);
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
    });
  }

  getFormOwnerByMe(form_id: string) {
    this.router.navigate(['/search', form_id]);
  }

  getFormAssignMe(form_id: string) {
    this.router.navigate(['/detail', form_id]);
  }

  //Upload File  
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
        console.log(resultArray)
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
        let setTeam = [...new Set(team)]
        //Domain
        const domain: any[] = []
        this.getJoinInDomain(2, 5, resultArray, domain) //soft skill
        this.getJoinInDomain(6, 28, resultArray, domain) //frontend
        this.getJoinInDomain(29, 38, resultArray, domain) //backend
        this.getJoinInDomain(39, 49, resultArray, domain) //AI
        this.getJoinInDomain(50, 52, resultArray, domain) //mobile
        this.getJoinInDomain(53, 63, resultArray, domain) //techonologies
        this.getJoinInDomain(64, 78, resultArray, domain) //programming languages
        this.getJoinInDomain(79, 88, resultArray, domain) //unit testing
        this.getJoinInDomain(89, 96, resultArray, domain) //databases
        this.getJoinInDomain(97, 99, resultArray, domain) //cloud
        this.getJoinInDomain(100, 101, resultArray, domain) //working model 
        //Skill and point
        // this.skillService.getAllSkills().subscribe(skills => {
        //   if (skills) {
        //     this.skills.filter(skill => {
        //       if (skill && skill.skill_name) {
        //         for (let i = 0; i < this.skills.length; i++) {
        //           if (resultArray[1][i] === this.skill.skill_name) {
        //             this.selectedValue = resultArray[2][i]
        //             console.log(this.selectedValue)
        //           }
        //         }
        //       }
        //     })
        //   }
        // })
        const data = {
          setTeam: setTeam,
          name: name,
          domain: domain
        }
        this.dataService.setData(data)
        if (setTeam.length === 0 || name.length === 0 || domain.length === 0) {
          this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Please use the valid form!' });
        } else {
          this.router.navigate(['/create']);
        }
      })
  }

  getJoinInDomain(startCol: number, endCol: number, arr: any[], data: any[]) {
    let sum = 0;
    let startRow = 2
    let endRow = arr.length - 1;
    while (sum <= 0 && endRow >= startRow) {
      for (let col = startCol; col <= endCol; col++) {
        sum += arr[endRow][col];
      }
      if (sum <= 0) { endRow--; }
    }
    if (sum === 0) {
      for (let col = startCol; col <= endCol; col++) {
        arr[0][col] = null;
      }
    } else if (sum > 0) {
      data.push(arr[0][startCol]);
    }
  }

  //Search by create_date
  searchByDate() {
    const user_id = this.cookieService.getCookie("user_id");
    const selectedDate = this.date;
    if (!selectedDate || selectedDate.toDateString() === new Date().toDateString()) {
      this.formService.getFormJoinInByUser(user_id).subscribe((dataAssign: Form[]) => {
        this.formsAssign = dataAssign;
      });
      this.formService.getFormOwner(user_id).subscribe((dataOwner: Form[]) => {
        this.formsOwner = dataOwner;
      });
    } else {
      this.formService.getFormJoinInByUser(user_id).subscribe((data: Form[]) => {
        if (data) {
          this.formsAssign = data.filter(form => {
            const formCreateDate = new Date(form.create_date);
            return formCreateDate > selectedDate;
          });
        }
      });
      this.formService.getFormOwner(user_id).subscribe((data: Form[]) => {
        if (data) {
          this.formsOwner = data.filter(form => {
            const formCreateDate = new Date(form.create_date);
            return formCreateDate > selectedDate;
          });
        }
      });
    }
  }

  //Search form
  searchForm(event: any) {
    const user_id = this.cookieService.getCookie("user_id");
    const searchContext = event.target.value.toLowerCase();
    if (this.activeIndex === 0) {
      this.formService.getFormJoinInByUser(user_id).subscribe((data: Form[]) => {
        if (data) {
          this.formsAssign = data.filter(form => form.form_name.toLowerCase().includes(searchContext));
        }
      });
    }
    if (this.activeIndex === 1) {
      this.formService.getFormOwner(user_id).subscribe((data: Form[]) => {
        if (data) {
          this.formsOwner = data.filter(form => form.form_name.toLowerCase().includes(searchContext));
        }
      });
    }
  }

  //Search domain
  searchDomain(event: any) {
    const searchContext = event.target.value.toLowerCase();
    this.domainService.getAllSkillDomains().subscribe((data: Domain[]) => {
      if (data) {
        this.domains = data.filter(domain => domain.domain_name.toLowerCase().includes(searchContext));
      }
    });
  }

  //Sort form name
  sortOrder: 'asc' | 'desc' = 'asc';
  toggleSortOrder() {
    this.sortOrder = this.sortOrder === 'asc' ? 'desc' : 'asc';
    if (this.activeIndex === 0) {
      this.formsAssign.sort((a, b) => {
        if (this.sortOrder === 'asc') {
          return a.form_name.localeCompare(b.form_name);
        } else {
          return b.form_name.localeCompare(a.form_name);
        }
      });
    }
    if (this.activeIndex === 1) {
      this.formsOwner.sort((a, b) => {
        if (this.sortOrder === 'asc') {
          return a.form_name.localeCompare(b.form_name);
        } else {
          return b.form_name.localeCompare(a.form_name);
        }
      });
    }
    if (this.activeIndex === 3)
      this.domains.sort((a, b) => {
        if (this.sortOrder === 'asc') {
          return a.domain_name.localeCompare(b.domain_name);
        } else {
          return b.domain_name.localeCompare(a.domain_name);
        }
      })
    this.panelStates = this.domains.map(() => true);
  }

  togglePanel(index: number) {
    this.panelStates[index] = !this.panelStates[index];
  }

  //Domain tabpanel
  removePanel() {
    this.confirmationService.confirm({
      message: 'Do you want to delete this domain?',
      header: 'Delete Confirmation',
      icon: 'pi pi-info-circle',
      accept: () => {
        this.messageService.add({ severity: 'info', summary: 'Confirmed', detail: 'Domain deleted' });
      },
      reject: (type: any) => {
        switch (type) {
          case ConfirmEventType.REJECT:
            this.messageService.add({ severity: 'error', summary: 'Rejected', detail: 'You have rejected' });
            break;
          case ConfirmEventType.CANCEL:
            this.messageService.add({ severity: 'warn', summary: 'Cancelled', detail: 'You have cancelled' });
            break;
        }
      },
    });
  }

  //Add domain button 
  showAddDomainDialog() {
    this.displayAddDomainButton = true
  }
  submitAddDomain() {
    this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Creation successful!' });
  }

  //Edit domain button
  showEditDomainDialog(domain_id: string) {
    this.displayEditDomainButton = true
    this.domainService.getDomainById(domain_id).subscribe((data: any) => {
      if (data && data.domain_name) {
        this.domainDetail = data
        this.domainDetail.domain_name = data.domain_name
      }
    })
  }
  submitEditDomain() {
    this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Creation successful!' });
  }
  addedValue!: string;

  skillNameInput(e: any) {
    this.addedValue = e.target.value;
  }

  addSkillName() {
    if (this.addedValue && this.domainDetail && this.domainDetail.domain_id) {
      const newSkill: Skill = {
        skill_id: '',
        skill_name: this.addedValue,
        skill_domain: {
          domain_id: this.domainDetail.domain_id,
          domain_name: this.domainDetail.domain_name,
        },
      };

      this.skillService.createSkill(newSkill).subscribe(
        (response) => {
          this.messageService.add({
            severity: 'success',
            summary: 'Thành công',
            detail: 'Tạo mới thành công!',
          });
        },
        (error) => {
          if (error.status === 400) {
            this.messageService.add({
              severity: 'error',
              summary: 'Lỗi',
              detail: 'Kỹ năng đã tồn tại',
            });
          } else {
            this.messageService.add({
              severity: 'error',
              summary: 'Lỗi',
              detail: 'Tạo mới thất bại!',
            });
          }
        }
      );
    }
  }
}