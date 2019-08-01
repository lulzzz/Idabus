import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { MatDialog } from '@angular/material';

import { EditorResult } from '../core/models/dynamicEditor.interface';
import { EditorCreatorComponent } from '../core/components/editor-creator/editor-creator.component';

@Component({
  selector: 'app-tab-view',
  templateUrl: './tab-view.component.html',
  styleUrls: ['./tab-view.component.scss']
})
export class TabViewComponent implements OnInit {
  tabsDefinition: Array<any>;
  @Input()
  get tabDefs() {
    return this.tabsDefinition;
  }
  set tabDefs(value) {
    this.tabsDefinition = value;
    this.tabDefsChange.emit(this.tabsDefinition);
  }
  @Output()
  tabDefsChange = new EventEmitter();

  @Input()
  icon: string;

  @Input()
  configMode = false;

  results: { [key: string]: Array<EditorResult> } = {};
  @Input()
  get editorResults() {
    return this.results;
  }
  set editorResults(value) {
    this.results = value;
    this.editorResultsChange.emit(this.results);
  }
  @Output()
  editorResultsChange = new EventEmitter();

  currentTabIndex = 0;

  constructor(private dialog: MatDialog) {}

  ngOnInit() {
    // this.tabDefs.forEach(t => {
    //   this.editorResults[t.name] = [];
    // });
  }

  onTabIndexChange(event: number) {
    this.currentTabIndex = event;
  }

  onArrange() {}

  onAddEditor() {
    const dialogRef = this.dialog.open(EditorCreatorComponent, {
      minWidth: '420px',
      data: {}
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result && result !== 'cancel') {
        this.tabDefs[this.currentTabIndex].attributes.push({
          attributeName: result.attributeName,
          editorType: result.type,
          editorConfig: {
            name: result.name
          }
        });
      }
    });
  }

  onChangeColumnNumber() {
    switch (this.tabDefs[this.currentTabIndex].columnNumber) {
      case 1:
        this.tabDefs[this.currentTabIndex].columnNumber = 2;
        break;
      case 2:
        this.tabDefs[this.currentTabIndex].columnNumber = 3;
        break;
      case 3:
        this.tabDefs[this.currentTabIndex].columnNumber = 4;
        break;
      case 4:
        this.tabDefs[this.currentTabIndex].columnNumber = 1;
        break;
      default:
        break;
    }
  }
}
