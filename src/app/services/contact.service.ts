import { HttpClient } from "@angular/common/http";
import { Contact } from "../models/contact.model";
import { Injectable } from "@angular/core";
import { Subject } from "rxjs";

@Injectable()
export class ContactService {
    protected api = 'http://localhost:3000/api/contact';
    private contacts!: Contact[];
    contactSubject = new Subject<any[]>();
    constructor(private httpClient: HttpClient) {}

    emitContactSubject() {
        this.contactSubject.next(this.contacts.slice());
    }

    createContact(contact: Contact) {
        this.httpClient.post<any>(this.api, {contact: contact})
        .subscribe((response) => {
            return response;
        },
        (error) => {
            return 'Error when sending message!';
        });
    }

    getContact() {
        this.httpClient.get<any>(this.api)
        .subscribe((contacts) => {
            this.contacts = contacts;
        }, (error) => {
            return 'Error when retrieving contact '+error;
        })
    }
}