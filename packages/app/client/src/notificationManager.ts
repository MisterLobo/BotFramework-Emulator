//
// Copyright (c) Microsoft. All rights reserved.
// Licensed under the MIT license.
//
// Microsoft Bot Framework: http://botframework.com
//
// Bot Framework Emulator Github:
// https://github.com/Microsoft/BotFramwork-Emulator
//
// Copyright (c) Microsoft Corporation
// All rights reserved.
//
// MIT License:
// Permission is hereby granted, free of charge, to any person obtaining
// a copy of this software and associated documentation files (the
// "Software"), to deal in the Software without restriction, including
// without limitation the rights to use, copy, modify, merge, publish,
// distribute, sublicense, and/or sell copies of the Software, and to
// permit persons to whom the Software is furnished to do so, subject to
// the following conditions:
//
// The above copyright notice and this permission notice shall be
// included in all copies or substantial portions of the Software.
//
// THE SOFTWARE IS PROVIDED ""AS IS"", WITHOUT WARRANTY OF ANY KIND,
// EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
// MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND
// NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE
// LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION
// OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION
// WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
//

import { Notification } from '@bfemulator/app-shared';

/** Singleton that will keep track of all active notifications that we can't put in the store */
export class NotificationManager {
  private static _instance: NotificationManager;

  // will be used to store notifications by id since they won't be able to
  // be serialized in the state store due to button handlers (functions)
  public notificationStore: { [key: string]: any };

  public static getInstance(): NotificationManager {
    if (!this._instance) {
      // throw new Error('Notification manager not yet initialized! Please use ".init()" first.');
      this._instance = new NotificationManager();
    }
    return this._instance;
  }

  public static init(): void {
    if (this._instance) {
      this._instance = new NotificationManager();
    }
  }

  /** Adds a notification to the notification store */
  public addNotification(notification: Notification): void {
    const { id } = notification;
    this.notificationStore[id] = notification;
  }

  /** Removes a notification from the notification store */
  public removeNotification(id: string): void {
    delete this.notificationStore[id];
  }

  /** Clears all notifications from the notification store */
  public clearNotifications(): void {
    this.notificationStore = {};
  }

  private constructor() {
    this.notificationStore = {};
  }
}