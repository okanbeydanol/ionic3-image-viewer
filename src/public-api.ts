/*
 * Public API Surface of clean lib
 */
import * as  Manager from 'hammerjs';
export type HammerController = { key: string, events?: Events[], hammerManagerInfo: hammerManagerInfo[], transitionElements: TransitionElements }
export type HammerBuilder = { type: HammerType, events?: Events[] }
export type HammerType = 'pan' | 'pinch' | 'swipe' | 'press' | 'tap' | 'doubletap';
export type Events =
  HammerPanEvents |
  HammerPinchEvents |
  HammerPressEvents |
  HammerSwipeEvents |
  HammerTapEvents |
  HammerDoubleTapEvents;
export type hammerManagerInfo = {
  type: HammerType,
  manager: Manager,
}

export type HammerCallback = {
  type: HammerType;
  events: Events[];
  hammerManagerInfo: hammerManagerInfo[];
  transitionElements?: TransitionElements;
  data?: HammerData;
}
export type HammerData = {
  type: string;
  deltaX: number;
  deltaY: number;
  deltaTime: number;
  distance: number;
  angle: number;
  velocityX: number;
  velocityY: number;
  velocity: number;
  direction: number;
  offsetDirection: number;
  scale: number;
  rotation: number;
  center: CoordinatesType;
  srcEvent: any;
  target: any;
  pointerType: string;
  eventType: number;
  isFirst: boolean;
  isFinal: boolean;
  pointers: any;
  additionalEvent: string;
  changedPointers: any;
  preventDefault: Function;
}
export type CoordinatesType = {
  x: number;
  y: number;
}
export enum HammerPanEvents {
  panleft = 'panleft',
  panright = 'panright',
  panup = 'panup',
  pandown = 'pandown',
  panstart = 'panstart',
  panmove = 'panmove',
  panend = 'panend',
  pancancel = 'pancancel'
}
export enum HammerPinchEvents {
  pinchstart = 'pinchstart',
  pinchmove = 'pinchmove',
  pinchend = 'pinchend',
  pinchcancel = 'pinchcancel',
  pinchin = 'pinchin',
  pinchout = 'pinchout'
}
export enum HammerPressEvents {
  press = 'press',
  pressup = 'pressup'
}
export enum HammerSwipeEvents {
  swipeleft = 'swipeleft',
  swiperight = 'swiperight',
  swipeup = 'swipeup',
  swipedown = 'swipedown',
}
export enum HammerTapEvents {
  tap = 'tap'
}
export enum HammerDoubleTapEvents {
  doubletap = 'doubletap'
}
export type TransitionElements = {
  key: string;
  element: HTMLElement,
  fixHammerjsDeltaIssue: TransitionCoordinates;
  pinchStart: TransitionCoordinates;
  trasitionsStarted: boolean;
  originalSize: TransitionSize;
  currentState: TransitionCurrentState;
  lastState: TransitionLastState;
  pinchZoomOrigin: TransitionCoordinates;
  scaleFactor: number;
  lastEvent: string;
}
export type TransitionCoordinates = {
  x: number;
  y: number;
}
export type TransitionSize = {
  width: number;
  height: number;
}
export type TransitionCurrentState = {
  x: number;
  y: number;
  z: number;
  zooming: boolean;
  scale: number;
  width: number;
  height: number;
}
export type TransitionLastState = {
  x: number;
  y: number;
  z: number;
}

export { ImageViewerService } from './lib/image-viewer.service';
export { ImageViewerComponent } from './lib/image-viewer.component';
export { ImageViewerModule } from './lib/image-viewer.module';
import { ImageModalComponent } from './lib/image/image-modal.component';
import { InonicHammerGestureModule } from './directives/directives.module';
