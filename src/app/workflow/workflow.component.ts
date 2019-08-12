import { Component, OnInit } from '@angular/core';

import { Activity } from '../core/models/dataContract.model';

@Component({
  selector: 'app-workflow',
  templateUrl: './workflow.component.html',
  styleUrls: ['./workflow.component.scss']
})
export class WorkflowComponent implements OnInit {
  workflowDef = {
    objecttype: 'workflow',
    objectid: 'ccccc111-1a63-4a56-ab4c-fe3002c93406',
    displayname: 'Handle changed team members',
    workflowdescription: {
      type: 'Sequential',
      id: '7c9ece6f-917d-4195-873b-eb4464d67ff3',
      isenabled: true,
      displayname: 'Add information to a team and to the person',
      activities: [
        {
          type: 'UpdateResources',
          id: 'c66a07d1-15e9-468d-a0ab-7b84992253b8',
          isenabled: true,
          displayname: 'set team description ',
          description:
            'updates the name of the team to contain the number of member and the latest update time',
          updateresourcesentries: [
            {
              // tslint:disable-next-line:max-line-length
              valueexpression:
                'Concatenate("The team now has ", CONVERTTOSTRING(count([//target/members])), " members since " + DateTimeNow())',
              target: '[//target/description]',
              allownull: true
            }
          ],
          actortype: 'ServiceAccount',
          xpathqueries: {}
        },
        {
          type: 'UpdateResources',
          id: 'c3545b1c-5ff0-4e5b-ad18-925fbc625629',
          isenabled: true,
          displayname: 'set manager',
          description: 'adds the member add info to workflowdata',
          updateresourcesentries: [
            {
              valueexpression: '[//delta/members/added]',
              target: '[//WorkflowData/allAddedMembers]',
              allownull: true
            }
          ],
          actortype: 'ServiceAccount',
          actor: null,
          executioncondition: 'CONTAINS([//Request/RequestParameter], "members/added")',
          xpathqueries: {},
          expressions: null
        },
        {
          type: 'ForEach',
          id: 'c1b1fc1e-9cc4-4c83-b30f-6bece0ed0246',
          isenabled: true,
          displayname: 'foreach added member add team name to description',
          description: null,
          activities: [
            {
              type: 'UpdateResources',
              id: 'ccc07af7-c8ee-4c29-a52f-b169ad35ea65',
              isenabled: true,
              displayname: 'set description',
              description: 'add team to description of the person',
              updateresourcesentries: [
                {
                  // tslint:disable-next-line:max-line-length
                  valueexpression:
                    'Concatenate([//WorkflowData/currentMember/description], "[now in team \'", [//target/displayname], "\'], ")',
                  target: '[//WorkflowData/currentMember/description]',
                  allownull: true
                }
              ],
              actortype: 'ServiceAccount',
              actor: null,
              executioncondition: null,
              xpathqueries: null,
              expressions: null
            },
            {
              type: 'UpdateResources',
              id: 'ccc07af7-c8ee-4c29-a52f-b169ad35ea65',
              isenabled: true,
              displayname: 'test me!',
              description: 'test me!',
              updateresourcesentries: [
                {
                  // tslint:disable-next-line:max-line-length
                  valueexpression:
                    'Concatenate([//WorkflowData/currentMember/description], "[now in team \'", [//target/displayname], "\'], ")',
                  target: '[//WorkflowData/currentMember/description]',
                  allownull: true
                }
              ],
              actortype: 'ServiceAccount',
              actor: null,
              executioncondition: null,
              xpathqueries: null,
              expressions: null
            }
          ],
          currentitemkey: 'currentMember',
          listkey: 'allAddedMembers',
          updatewhileiterating: false,
          continueonerror: true,
          executioncondition: 'IsPresent(//WorkflowData/allAddedMembers)'
        },
        {
          type: 'UpdateResources',
          id: 'c3545b1c-5ff0-4e5b-ad18-925fbc625629',
          isenabled: true,
          displayname: 'set manager',
          description: 'adds the member removal info to workflowdata',
          updateresourcesentries: [
            {
              valueexpression: '[//delta/members/removed]',
              target: '[//WorkflowData/allRemovedMembers]',
              allownull: true
            }
          ],
          actortype: 'ServiceAccount',
          actor: null,
          executioncondition: 'CONTAINS([//Request/RequestParameter], "members/removed")',
          xpathqueries: {},
          expressions: null
        },
        {
          type: 'ForEach',
          id: 'c1b1fc1e-9cc4-4c83-b30f-6bece0ed0246',
          isenabled: true,
          displayname: 'foreach removed member remove team name from description',
          description: null,
          activities: [
            {
              type: 'UpdateResources',
              id: 'ccc07af7-c8ee-4c29-a52f-b169ad35ea65',
              isenabled: true,
              displayname: 'update description of person',
              description: 'remove team from description of the person',
              updateresourcesentries: [
                {
                  // tslint:disable-next-line:max-line-length
                  valueExpression:
                    'REPLACESTRING([//WorkflowData/currentMember/description], "[now in team \'" + [//target/displayname] + "\'], ", "")',
                  target: '[//WorkflowData/currentMember/description]',
                  allownull: true
                }
              ],
              actortype: 'ServiceAccount',
              actor: null,
              executioncondition: null,
              xpathqueries: null,
              expressions: null
            },
            {
              type: 'UpdateResources',
              id: 'ccc07af7-c8ee-4c29-a52f-b169ad35ea65',
              isenabled: true,
              displayname: 'test me again!',
              description: 'remove team from description of the person',
              updateresourcesentries: [
                {
                  // tslint:disable-next-line:max-line-length
                  valueExpression:
                    'REPLACESTRING([//WorkflowData/currentMember/description], "[now in team \'" + [//target/displayname] + "\'], ", "")',
                  target: '[//WorkflowData/currentMember/description]',
                  allownull: true
                }
              ],
              actortype: 'ServiceAccount',
              actor: null,
              executioncondition: null,
              xpathqueries: null,
              expressions: null
            }
          ],
          currentitemkey: 'currentMember',
          listkey: 'allRemovedMembers',
          updatewhileiterating: false,
          continueonerror: true,
          executioncondition: 'IsPresent(//WorkflowData/allRemovedMembers)'
        }
      ]
    }
  };

  // activities = this.workflowDef.workflowdescription.activities.map(a => a.activity);
  activities = this.workflowDef.workflowdescription.activities;

  constructor() {}

  ngOnInit() {}

  hasSubItems(item: Activity): boolean {
    if (!item) {
      return false;
    }
    if (item.activities && item.activities.length > 0) {
      return true;
    }
    if (item.activity) {
      return true;
    }
    return false;
  }

  getSubItems(item: Activity) {
    if (!item) {
      return [];
    }
    if (item.activities && item.activities.length > 0) {
      return item.activities;
    }
    if (item.activity) {
      return [item.activity];
    }
    return [];
  }

  getIcon(item: Activity) {
    switch (item.type.toLowerCase()) {
      case 'updateresources':
        return 'edit';
      case 'foreach':
        return 'loop';
      case 'sequential':
        return 'import_export';
      default:
        return 'no_listed_location';
    }
  }

  onToggleDisplay(item: Activity) {
    if (item.display) {
      item.display = !item.display;
    } else {
      item.display = true;
    }
  }

  onAddActivity() {
    console.log(this.activities);
    console.log(this.workflowDef);
  }
}