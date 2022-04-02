import { EventEmitter, Output, Injectable } from "@angular/core";
import { Subject } from "rxjs";
import { map } from 'rxjs/operators';

import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';

import { Document } from "./document.model";

import { MOCKDOCUMENTS } from "./MOCKDOCUMENTS";


@Injectable()
export class DocumentService {
    documentListChangedEvent = new Subject<Document[]>();
    startedEditing = new Subject<number>();
    @Output() documentSelected = new EventEmitter<Document>();
    @Output() documentChangedEvent = new EventEmitter<Document[]>();

    documents: Document[] = []; 
    maxDocumentId: number;
    constructor(private http: HttpClient) {
        this.getDocumentshttp()
     }


          getMaxId(documents): number {
         let maxId = 0

         documents.forEach(document => {
             let currentId = Number(document.id);
             if(currentId > maxId) {
                 maxId = currentId;
                 return maxId;
             }
             else {
                 return maxId;
             }

         })
         return maxId

     }

     getDocuments() :Document[] {
         return this.documents.slice()
     }


     getDocumentshttp() {
        this.http
        .get<{message: string; documents: any}>(
            "http://localhost:3000/documents"
        )
        .pipe(map((documentData) => {
            return documentData.documents.map(document => {
                return {
                    name: document.name,
                    url: document.url,
                    id: document.id,
                    children: document.children
                }
            })
        }))
        .subscribe(
            (documents: Document[] ) => {
                this.documents = documents;
                this.maxDocumentId = this.getMaxId(this.documents)
                //this.documents.sort()
                this.documentListChangedEvent.next([...this.documents])
            })
        
    }

    getDocumentsUpdateListener() {
        return this.documentChangedEvent.asObservable()
    }

    storeDocuments() {
        let documents = JSON.stringify(this.documents);
        const headers = new HttpHeaders()
            .set('content-type', 'application/json')
            .set('Access-Control-Allow-Origin', '*');
        this.http
            .put(
              'http://localhost:3000/documents',
              documents, {
                  headers: {'header1': 'content-type', 'header2':'application/json', 'header3': 'Access-Control-Allow-Origin', 'header4': '*'}
              }
            )
            .subscribe(response => {
              this.documentListChangedEvent.next(this.documents);
            });

    }

    getTheDocument(index: number) {
        
        this.getDocumentshttp();
        this.documentListChangedEvent
        .subscribe(
          (documents: Document[]) => {
            this.documents = documents
            
          }
        )
        
        return this.documents[index];
    }

    getDocument(id): Document {
        let documentvar = null
        
        this.documents.forEach(document => {
            if (document.id == id) {
                documentvar = document    
                return documentvar
            }
        });
        return documentvar;
    }

    deleteDocument(document: Document) {

        if (!document) {
          return;
        }
    
        const pos = this.documents.findIndex(d => d.id === document.id);
    
        if (pos < 0) {
          return;
        }
    
        // delete from database
        this.http.delete('http://localhost:3000/documents/' + document.id)
          .subscribe(
            (response: Response) => {
              this.documents.splice(pos, 1);
              //this.sortAndSend();
            }
          );
      }
    
/*
    deleteDocument(document: Document) {
        if (!document) {
           return;
        }
        const pos = this.documents.indexOf(document);
        if (pos < 0) {
           return;
        }
        this.documents.splice(pos, 1);
        let documentsListClone = this.documents.slice()
        this.storeDocuments();
     }
     */

     addDocument(document: Document) {
         if (!document) {
             return
         }

         document.id = "";
         const headers = new HttpHeaders({'Content-Type': 'application/json'});
         this.http.post<{ message: string, document: Document }>('http://localhost:3000/documents',
         document,
         { headers: headers })
         .subscribe(
           (responseData) => {
             // add new document to documents
             this.documents.push(responseData.document);
             //this.sortAndSend();
           }
         );

     }

     updateDocument(originalDocument: Document, newDocument: Document, id) {
        if (!originalDocument || !newDocument) {
            return;
          }
      
          const pos = this.documents.findIndex(d => d.id === originalDocument.id);
      
          if (pos < 0) {
            return;
          }
      
          // set the id of the new Document to the id of the old Document
          newDocument.id = originalDocument.id;
          //newDocument._id = originalDocument._id;
          console.log(newDocument)
          console.log(originalDocument)
      
          const headers = new HttpHeaders({'Content-Type': 'application/json'});
      
          // update database
          this.http.put('http://localhost:3000/documents/' + id,
            newDocument, { headers: headers })
            .subscribe(
              (response: Response) => {
                  console.log(this.documents[pos])
                this.documents[pos] = newDocument;
                //this.sortAndSend();
              }
            );
     }

     /*

     addDocument(newDocument: Document) {

        let documentsListClone: Document[]
         if(typeof(newDocument) === 'undefined') {
             return 
         }
         else {
             this.maxDocumentId++
             
             newDocument.id = String(this.maxDocumentId);
             this.documents.push(newDocument);
             documentsListClone = this.documents.slice();
             //console.log(documentsListClone)
         }

         this.storeDocuments()
     }
     

     updateDocument(originalDocument: Document, newDocument: Document) {
         if ( originalDocument || newDocument ) {
            let pos = this.documents.indexOf(originalDocument)
            if (pos >= 0) {
                newDocument.id = originalDocument.id;
                this.documents[pos] = newDocument;
                let documentsListClone = this.documents.slice();
                this.storeDocuments()
            }
            else {
                console.log("index of doc is less than 0: " + pos)
                return
            }
         }
         else {
             console.log("probably doesn't exist")
             return
         }

     }
     */




}