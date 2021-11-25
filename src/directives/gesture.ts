import { Injectable } from '@angular/core';
import * as Hammer from 'hammerjs';
import { Events, HammerBuilder, HammerCallback, HammerController, HammerData, HammerDoubleTapEvents, hammerManagerInfo, HammerPanEvents, HammerPinchEvents, HammerPressEvents, HammerSwipeEvents, HammerTapEvents, HammerType, TransitionElements } from '../public-api';

/**
 * Directive to add hammerjs all event.
 */
@Injectable()
export class CoreGestureService {
  private eventsPan: Events[] =
    [
      HammerPanEvents.panstart,
      HammerPanEvents.panmove,
      HammerPanEvents.panend
    ];

  private eventsPinch: Events[] =
    [
      HammerPinchEvents.pinchstart,
      HammerPinchEvents.pinchmove,
      HammerPinchEvents.pinchend,
    ];

  private eventsSwipe: Events[] =
    [
      HammerSwipeEvents.swipedown,
      HammerSwipeEvents.swipeleft,
      HammerSwipeEvents.swiperight,
      HammerSwipeEvents.swipeup,
    ];
  private eventsPress: Events[] =
    [
      HammerPressEvents.press,
      HammerPressEvents.pressup,
    ];
  private eventsTap: Events[] =
    [
      HammerTapEvents.tap,
    ];
  private eventsDoubleTap: Events[] =
    [
      HammerDoubleTapEvents.doubletap,
    ];
  private hammerController: HammerController[] = [];
  private busy = false;

  async handle(hammer: HammerBuilder, element: HTMLElement, callback: Function) {
    if (this.busy) {
      await this.waitFor(() => this.busy === false);
    }
    this.busy = true;
    let hammerController: HammerController = await this.checkHammerController(hammer, element);
    hammerController.hammerManagerInfo = await this.addManagerType(hammer, hammerController.hammerManagerInfo, element);
    this.startListeners(hammerController, hammer.type, (data) => {
      callback(data);
    });
    this.busy = false;
  }
  private startListeners(hammerController: HammerController, hammerType: HammerType, callback: Function) {
    if (hammerType) {
      const eventRules: Events[] = this.eventRules(hammerType, hammerController.events);
      const callBackData = { type: hammerType, events: eventRules, hammerManagerInfo: hammerController.hammerManagerInfo, transitionElements: hammerController.transitionElements };
      if (hammerType) {
        if (hammerType === 'pan') {
          this.panHandler(eventRules, hammerController.hammerManagerInfo, (data: HammerData) => {
            callBackData['data'] = data;
            callback(callBackData)
          });
        } else if (hammerType == 'press') {
          this.pressHandler(eventRules, hammerController.hammerManagerInfo, (data: HammerData) => {
            callBackData['data'] = data;
            callback(callBackData)
          });
        } else if (hammerType == 'tap') {
          this.tapHandler(eventRules, hammerController.hammerManagerInfo, (data: HammerData) => {
            callBackData['data'] = data;
            callback(callBackData)
          });
        } else if (hammerType == 'doubletap') {
          this.doubleTapHandler(eventRules, hammerController.hammerManagerInfo, (data: HammerData) => {
            callBackData['data'] = data;
            callback(callBackData)
          });
        }
        else if (hammerType == 'swipe') {
          this.swipeHandler(eventRules, hammerController.hammerManagerInfo, (data: HammerData) => {
            callBackData['data'] = data;
            callback(callBackData)
          });
        } else if (hammerType == 'pinch') {
          this.pinchHandler(eventRules, hammerController.hammerManagerInfo, (data: HammerData) => {
            callBackData['data'] = data;
            callback(callBackData)
          });
        }
      }
    }
  }

  async mcDestroy(hammer: HammerCallback) {
    if (hammer !== null && hammer !== undefined) {
      const hammerController = await this.getHammerController(hammer.transitionElements.key);
      if (hammerController) {
        hammerController.hammerManagerInfo.forEach(managerInfo => {
          managerInfo.manager.destroy();
        });
        const findIndex = this.hammerController.findIndex(o => o.key === hammer.transitionElements.key);
        if (findIndex !== -1) {
          this.hammerController.splice(findIndex, 1);
        }
      }
    }
  }

  private async checkHammerController(hammer: HammerBuilder, element: HTMLElement): Promise<HammerController> {
    let elementKey = await this.getKeyFromElement(element);
    if (elementKey !== null) {
      let hammerController = await this.getHammerController(elementKey);
      if (hammerController !== null) {
        hammerController.events = hammerController.events.concat(hammer.events);
        return hammerController;
      } else {
        await this.deleteKeyFromElement(element);
        elementKey = await this.createKeyAndSetToElement(element);
        hammerController = await this.createHammerController(hammer, element, elementKey);
        return hammerController;
      }
    }
    elementKey = await this.createKeyAndSetToElement(element);
    let hammerController = await this.createHammerController(hammer, element, elementKey);
    this.hammerController.push(hammerController);
    return hammerController;
  }
  private getHammerController(key: string): Promise<HammerController> {
    return new Promise((resolve) => {
      const index = this.hammerController.findIndex(o => o.key === key);
      if (index !== -1) {
        resolve(this.hammerController[index]);
      } else {
        resolve(null);
      }
    })
  }
  private createHammerController(hammer: HammerBuilder, element: HTMLElement, key: string): Promise<HammerController> {
    return new Promise(async (resolve) => {
      let hammerController: HammerController = null;
      const initialData: TransitionElements = await this.getInitialData(key, element);
      hammerController = {
        key: key,
        events: hammer.events,
        hammerManagerInfo: [],
        transitionElements: initialData,
      }
      resolve(hammerController);
    })
  }

  private panHandler(events: Events[], hammerManagerInfo: hammerManagerInfo[], callback: Function) {
    const event = events ? events.join(' ').toString() : this.eventsPan.join(' ').toString();
    const findManagerIndex = hammerManagerInfo.findIndex(o => o.type === 'pan');
    if (findManagerIndex !== -1) {
      hammerManagerInfo[findManagerIndex].manager.add(new Hammer.Pan({ direction: Hammer.DIRECTION_ALL }));
      hammerManagerInfo[findManagerIndex].manager.on(event, (data: HammerData) => {
        callback(data);
      });
    }

  }
  private pressHandler(events: Events[], hammerManagerInfo: hammerManagerInfo[], callback: Function) {
    const event = events ? events.join(' ').toString() : this.eventsPress.join(' ').toString();
    const findManagerIndex = hammerManagerInfo.findIndex(o => o.type === 'press');
    if (findManagerIndex !== -1) {
      hammerManagerInfo[findManagerIndex].manager.add(new Hammer.Press());
      hammerManagerInfo[findManagerIndex].manager.on(event, (data: HammerData) => {
        callback(data);
      });
    }
  }
  private tapHandler(events: Events[], hammerManagerInfo: hammerManagerInfo[], callback: Function) {
    const event = events ? events.join(' ').toString() : this.eventsTap.join(' ').toString();
    const findManagerIndex = hammerManagerInfo.findIndex(o => o.type === 'press');
    if (findManagerIndex !== -1) {
      hammerManagerInfo[findManagerIndex].manager.add(new Hammer.Tap({ event: 'singletap' }));
      hammerManagerInfo[findManagerIndex].manager.on(event, (data: HammerData) => {
        callback(data);
      });
    }
  }
  private doubleTapHandler(events: Events[], hammerManagerInfo: hammerManagerInfo[], callback: Function) {
    const event = events ? events.join(' ').toString() : this.eventsDoubleTap.join(' ').toString();
    const findManagerIndex = hammerManagerInfo.findIndex(o => o.type === 'doubletap');
    if (findManagerIndex !== -1) {
      hammerManagerInfo[findManagerIndex].manager.on(event, (data) => {
        callback(data);
      });
    }
  }
  private swipeHandler(events: Events[], hammerManagerInfo: hammerManagerInfo[], callback: Function) {
    const event = events ? events.join(' ').toString() : this.eventsSwipe.join(' ').toString();
    const findManagerIndex = hammerManagerInfo.findIndex(o => o.type === 'swipe');
    if (findManagerIndex != -1) {
      hammerManagerInfo[findManagerIndex].manager.add(new Hammer.Swipe({ direction: Hammer.DIRECTION_ALL }));
      hammerManagerInfo[findManagerIndex].manager.on(event, (data) => {
        callback(data);
      });
    }
  }
  private pinchHandler(events: Events[], hammerManagerInfo: hammerManagerInfo[], callback: Function) {
    const event = events ? events.join(' ').toString() : this.eventsPinch.join(' ').toString();
    const findManagerIndex = hammerManagerInfo.findIndex(o => o.type === 'pinch');
    if (findManagerIndex != -1) {
      hammerManagerInfo[findManagerIndex].manager.add(new Hammer.Pinch());
      hammerManagerInfo[findManagerIndex].manager.on(event, (data) => {
        callback(data);
      });
    }
  }

  private organizeEvents(defaultEvents, events) {
    const blank = [];
    events.forEach((event) => {
      const findIndex = defaultEvents.findIndex(o => o == event);
      if (findIndex != -1) {
        blank.push(event);
      }
    });
    if (blank.length === 0) {
      return defaultEvents;
    }
    return blank;
  }
  private eventRules(type: HammerType, events: Events[]): Events[] {
    if (type == 'pan') {
      if (!events || events.length === 0) {
        return this.eventsPan;
      } else {
        return this.organizeEvents(this.eventsPan, events);
      }
    } else if (type == 'pinch') {
      if (!events || events.length === 0) {
        return this.eventsPinch;
      } else {
        return this.organizeEvents(this.eventsPinch, events);
      }
    } else if (type == 'swipe') {
      if (!events || events.length === 0) {
        return this.eventsSwipe;
      } else {
        return this.organizeEvents(this.eventsSwipe, events);
      }
    } else if (type == 'press') {
      if (!events || events.length === 0) {
        return this.eventsPress;
      } else {
        return this.organizeEvents(this.eventsPress, events);
      }
    } else if (type == 'tap') {
      if (!events || events.length === 0) {
        return this.eventsTap;
      } else {
        return this.organizeEvents(this.eventsTap, events);
      }
    } else if (type == 'doubletap') {
      if (!events || events.length === 0) {
        return this.eventsDoubleTap;
      } else {
        return this.organizeEvents(this.eventsDoubleTap, events);
      }
    }
  }
  private addManagerType(hammer: HammerBuilder, managerInfo: hammerManagerInfo[], element: HTMLElement): Promise<hammerManagerInfo[]> {
    return new Promise((resolve) => {
      const findIndex = managerInfo.findIndex(o => o.type === hammer.type);
      if (findIndex !== -1) {
        managerInfo[findIndex].manager.destroy();
        managerInfo[findIndex].manager = new Hammer(element);
      } else {
        managerInfo.push({ type: hammer.type, manager: new Hammer(element) });
      }
      resolve(managerInfo);
    });
  }
  private deleteKeyFromElement(el: HTMLElement): void {
    return el.removeAttribute('gestureid');
  }
  private createKeyAndSetToElement(el: HTMLElement): Promise<string> {
    return new Promise((resolve) => {
      const generateKey = this.generateHexString(10);
      el.setAttribute('gestureid', generateKey);
      resolve(generateKey);
    });
  }
  private getKeyFromElement(el: HTMLElement): Promise<string> {
    return new Promise(async (resolve) => {
      const key = el.getAttribute('gestureid');
      if (key !== null) {
        resolve(key);
      } else {
        resolve(null)
      }
    });
  }
  private getInitialData(key: string, element: HTMLElement): TransitionElements {
    const width = element.offsetWidth;
    const height = element.offsetHeight
    const data: TransitionElements = {
      key: key,
      element: element,
      fixHammerjsDeltaIssue: { x: 0, y: 0 },
      pinchStart: { x: undefined, y: undefined },
      trasitionsStarted: false,
      originalSize: { width: width, height: height },
      currentState: {
        x: 0,
        y: 0,
        z: 1,
        zooming: false,
        scale: 0,
        width: width * 1,
        height: height * 1,
      },
      lastState: {
        x: 0,
        y: 0,
        z: 1,
      },
      pinchZoomOrigin: undefined,
      scaleFactor: 0.6,
      lastEvent: ''
    }
    return data;
  }
  private generateHexString(length) {
    var ret = "";
    while (ret.length < length) {
      ret += Math.random().toString(16).substring(2);
    }
    return ret.substring(0, length);
  }
  private waitFor = async (condFunc: () => boolean) => {
    return new Promise((resolve) => {
      if (condFunc()) {
        resolve(true);
      }
      else {
        setTimeout(async () => {
          await this.waitFor(condFunc);
          resolve(true);
        }, 100);
      }
    });
  };
}
