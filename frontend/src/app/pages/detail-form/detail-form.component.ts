import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Form } from 'src/app/models/form.model';
import { Skill } from 'src/app/models/skill.model';
import { User } from './../../models/user.model';
import { Domain } from 'src/app/models/domain.model';
import { FormService } from '../../services/form/form.service';
import { SkillService } from 'src/app/services/form/skill.service';
import { DomainService } from '../../services/form/domain.service';
import { UserService } from 'src/app/services/user/user.service';

@Component({
  selector: 'app-detail-form',
  templateUrl: './detail-form.component.html',
  styleUrls: ['./detail-form.component.sass'],
  encapsulation: ViewEncapsulation.None
})
export class DetailFormComponent implements OnInit {
  points = [0, 1, 2, 3, 4, 5];
  selectedValue!: string;
  detailFormPageText: any;
  form: Form = {
    form_id: '',
    form_name: '',
    create_date: '',
    form_deadline: '',
    form_description: '',
    user: null
  };
  user: User = {
    user_id: '',
    password: '',
    full_name: '',
    gender: '',
    birthday: '',
    avatar: '',
    phone_number: '',
    email: '',
    status: '',
    role: '',
    create_date: '',
    team: undefined
  };
  domains: Domain[] = [];
  skills: Skill[] = [];
  skill: Skill | null = null;
  isEditing: boolean = false;
  isPanelEnabled: boolean = false;

  constructor(private router: ActivatedRoute,
    private routerNav: Router,
    private domainService: DomainService,
    private formService: FormService,
    private skillService: SkillService,
    private userService: UserService) { }

  ngOnInit(): void {
    this.router.paramMap.subscribe(params => {
      const form_id = params.get('form_id');
      if (form_id !== null) {
        this.formService.getFormById(form_id).subscribe((data: Form) => {
          if (data && data.form_name) {
            this.form = data;
            this.form.form_name = data.form_name;
            if (data.user && data.user.user_id) {
              const user_id = data.user.user_id;
              this.userService.getUserById(user_id).subscribe((userData: User) => {
                if (userData) {
                  this.user = userData;
                }
              });
            }
          }
        });
        this.domainService.getDomainByFormId(form_id).subscribe(data => {
          if (data) {
            this.domains = data;
          }
        });
      }
    });

    this.skillService.getAllSkills().subscribe((data: Skill[]) => {
      if (data) {
        this.skills = data;
        this.skills.map((skill: Skill) => {
          if (skill && skill.skill_name && skill.skill_domain && skill.skill_domain?.domain_id) {
            this.skill = skill;
            this.skill.skill_name = skill.skill_name;
            if (this.skill.skill_domain) {
              this.skill.skill_domain.domain_id = skill.skill_domain.domain_id;
            }
          }
        });
      }
    });
  }

  // Back button
  backToHomePage() {
    this.routerNav.navigate(['/']);
  }

  // Edit button
  editDomainForm(event: any) {
    this.isEditing = true;
    const overlay = document.getElementById("overlay") as HTMLDivElement;
    overlay.style.display = "none";
  }
}
