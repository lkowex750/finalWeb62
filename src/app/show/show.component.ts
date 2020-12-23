import { Component, OnInit } from '@angular/core';
import {SelectItem} from 'primeng/api';
import { HttpClient } from '@angular/common/http';
import { DatapassService } from '../datapass.service';
import { ifStmt } from '@angular/compiler/src/output/output_ast';


interface City {
  name: string;
  value: string;
  
}
interface Symptom {
  name: string;
  
  
}
interface Record{
  amount: string;
  valueInt: number;
}
interface County{
  city: string;
}
interface Gender{
  gender: string;
}


@Component({
  selector: 'app-show',
  templateUrl: './show.component.html',
  styleUrls: ['./show.component.css']
})
export class ShowComponent implements OnInit {
  
  cities1: SelectItem[];
    
  symptom: City[];
  symptom1: Symptom[];
  record: Record[];
  
  county: County[];
  gender: Gender[];
  selectedSymptom: City = {name: 'ทั้งหมด', value: 'all'};
  selectedSymptom1: Symptom = {name: 'ติดเชื้อ'};
  selectedRecord: Record;
  selecredCounty: County = {city: 'กรุงเทพมหานคร'};
  selecredGender: Gender = {gender:'ชาย'};

  displayPosition: boolean;
  displayEdit: boolean;
  displayDelete: boolean;
  position: string;
  id:any;

  name:any;
  career:any;
  date:any;
  time:any;

  data  :any = Array();

  
  cols: any[];
  pageActual: number = 1;
  recordCount: number;
  rowPagi: number = 3;
  
  constructor(private http: HttpClient,private datapass :DatapassService) {
    
   
  
this.symptom = [
  {name: 'ทั้งหมด', value: 'all'},
  {name: 'ติดเชื้อ', value: 'infect'},
  {name: 'อาการหนัก', value: 'seriously'},
  {name: 'รักษาหายแล้ว', value: 'cure'}
  
];
this.symptom1 = [
  {name: 'ติดเชื้อ'},
  {name: 'อาการหนัก'},
  {name: 'รักษาหายแล้ว'}
  
];

this.record = [
  { amount :'3',valueInt: 3},
  { amount :'5',valueInt: 5},
  { amount :'10',valueInt: 10}
];
this.county = [
  {city: 'กรุงเทพมหานคร'},{city: 'กระบี่'},{city: 'กาญจนบุรี'},{city: 'กาฬสินธุ์'},{city: 'กำแพงเพชร'},{city: 'ขอนแก่น'},{city: 'จันทบุรี'},{city: 'ฉะเชิงเทรา'},
  {city: 'ชลบุรี'},{city: 'ชัยนาท'},{city: 'ชัยภูมิ'},{city: 'ชุมพร'},{city: 'เชียงราย'},{city: 'เชียงใหม่'},
  {city: 'ตรัง'},{city: 'ตราด'},{city: 'ตาก'},{city: 'นครนายก'},{city: 'นครปฐม'},{city: 'นครพนม'},
  {city: 'นครราชสีมา'},{city: 'นครราชสีมา'},{city: 'นครสวรรค์'},{city: 'นนทบุรี'},{city: 'นราธิวาส'},{city: 'น่าน'},
  {city: 'บึงกาฬ'},{city: 'บุรีรัมย์'},{city: 'ปทุมธานี'},{city: 'ประจวบคีรีขันธ์'},{city: 'ปราจีนบุรี'},{city: 'ปัตตานี'},
  {city: 'พระนครศรีอยุธยา'},{city: 'พะเยา'},{city: 'พังงา'},{city: 'พัทลุง'},{city: 'พิจิตร'},{city: 'พิษณุโลก'},
  {city: 'เพชรบุรี'},{city: 'เพชรบูรณ์'},{city: 'แพร่'},{city: 'ภูเก็ต'},{city: 'มหาสารคาม'},{city: 'มุกดาหาร'},
  {city: 'แม่ฮ่องสอน'},{city: 'ยโสธร'},{city: 'ยะลา'},{city: 'ร้อยเอ็ด'},{city: 'ระนอง'},{city: 'ระยอง'},
  {city: 'ราชบุรี'},{city: 'ลพบุรี'},{city: 'ลำปาง'},{city: 'ลำพูน'},{city: 'เลย'},{city: 'ศรีสะเกษ'},{city: 'สกลนคร'},
  {city: 'สงขลา'},{city: 'สตูล'},{city: 'สมุทรปราการ'},{city: 'สมุทรสงคราม'},{city: 'สมุทรสาคร'},{city: 'สระแก้ว'},{city: 'สระบุรี'},
  {city: 'สิงห์บุรี'},{city: 'สุโขทัย'},{city: 'สุพรรณบุรี'},{city: 'สุราษฎร์ธานี'},{city: 'สุรินทร์'},{city: 'หนองคาย'},
  {city: 'หนองบัวลำภู'},{city: 'อ่างทอง'},{city: 'อำนาจเจริญ'},{city: 'อุดรธานี'},{city: 'อุตรดิตถ์'},{city: 'อุทัยธานี'},{city: 'อุบลราชธานี'}
];
this.gender = [
  {gender:'ชาย'},{gender: 'หญิง'}
];
}


  ngOnInit(){
    this.listPatient();
    
  }

  showPositionDialog(position: string) {
    this.position = position;
    this.displayPosition = true;
}

  showEdit() {
    
    this.displayEdit = true;
  }
  showDelete(){
    this.displayDelete = true;
  }

  search(){
    console.log(this.selectedSymptom.value);
    this.http.get('http://localhost:81/webdevFinal/searchStatus/'+this.selectedSymptom.value).subscribe(response =>{
      this.data = new Array();
      this.data = response;
      this.rowPagi = this.selectedRecord.valueInt;
    });
  }
  insert(){
    
    let m ;
    if(this.date.getMonth() == 0){
      m = "1";
    }else if(this.date.getMonth() == 1){
      m = "2";
    }else if(this.date.getMonth() == 2){
      m = "3";
    }else if(this.date.getMonth() == 3){
      m = "4";
    }else if(this.date.getMonth() == 4){
      m = "5";
    }else if(this.date.getMonth() == 5){
      m = "6";
    }else if(this.date.getMonth() == 6){
      m = "7";
    }else if(this.date.getMonth() == 7){
      m = "8";
    }else if(this.date.getMonth() == 8){
      m = "9";
    }else if(this.date.getMonth() == 9){
      m = "10";
    }else if(this.date.getMonth() == 10){
      m = "11";
    }else if(this.date.getMonth() == 11){
      m = "12";
    }
    
    // let date = this.date.getDate()+"-"+m+"-"+this.date.getFullYear();
    let date = this.date.getFullYear()+"-"+m+"-"+this.date.getDate();
    let time = this.time.getHours()+":"+this.time.getMinutes()+":"+this.time.getSeconds();
    console.log(this.name);
    console.log(this.selecredGender.gender);
    console.log(this.career);
    console.log(date);
    console.log(this.date.getMonth());
    console.log(time);
    console.log(this.selecredCounty.city);
    
    let json = {
      name: this.name,
      gender:this.selecredGender.gender,
      career: this.career,
      county: this.selecredCounty.city,
      date : date,
      time: time,
      status: "ติดเชื้อ"
    };

    this.http.post('http://localhost:81/webdevFinal/insertPatient',JSON.stringify(json)).subscribe(response =>{
      console.log(response);
      this.http.get('http://localhost:81/webdevFinal/showPatient').subscribe(response=>{
        this.data = new Array();
        this.data = response;
      });
    });
  }

  async listPatient(){
    let request = await this.http.get('http://localhost:81/webdevFinal/showPatient').toPromise();
    this.data = request;
    console.log(this.data);

    this.recordCount = this.data.length;
    console.log(this.recordCount);
    
  }
  paginator(){
    this.http.get('http://localhost:81/webdevFinal/showPatient').subscribe(response=>{
        this.data = new Array();
        this.data = response;
        this.rowPagi = this.selectedRecord.valueInt;
      });
  }

  edit(){
    
    console.log("ed: "+this.id);
    console.log("Symptom: "+this.selectedSymptom1.name);

    let json = {id: this.id,status:this.selectedSymptom1.name};
    this.http.post('http://localhost:81/webdevFinal/editStatus',JSON.stringify(json)).subscribe(response =>{
      console.log(response);
      this.http.get('http://localhost:81/webdevFinal/showPatient').subscribe(response=>{
        this.data = new Array();
        this.data = response;
      });
    });
  }
  delete(){
    console.log("dl: "+this.id);
    let json = {id: this.id};
    this.http.post('http://localhost:81/webdevFinal/deletePatient',JSON.stringify(json)).subscribe(response =>{
      this.http.get('http://localhost:81/webdevFinal/showPatient').subscribe(response=>{
        this.data = new Array();
        this.data = response;
        
      });
    });
  }

  setID(id){
    this.id = id;
  }
}
