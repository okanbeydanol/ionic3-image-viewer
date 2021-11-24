import { Injectable } from '@angular/core';
import { HammerCallback, TransitionElements } from './../public-api';

/**
 * trasitions to add hammerjs all event.
 */


@Injectable()
export class CoreGestureTransitionService {
  panTransition(hammer: HammerCallback) {
    console.log(hammer.data.type);
    const transitionElement = hammer.transitionElements;
    hammer.transitionElements.originalSize.width = hammer.transitionElements.element.offsetWidth;
    hammer.transitionElements.originalSize.height = hammer.transitionElements.element.offsetHeight;
    if (hammer.data.type !== 'panend') {
      if (transitionElement.lastEvent !== 'pan') {
        transitionElement.fixHammerjsDeltaIssue = {
          x: hammer.data.deltaX,
          y: hammer.data.deltaY
        }
      }
      transitionElement.currentState.x = transitionElement.lastState.x + hammer.data.deltaX - transitionElement.fixHammerjsDeltaIssue.x;
      transitionElement.currentState.y = transitionElement.lastState.y + hammer.data.deltaY - transitionElement.fixHammerjsDeltaIssue.y;
      transitionElement.lastEvent = 'pan';
      transitionElement.currentState.height = transitionElement.originalSize.height * transitionElement.currentState.z;
      transitionElement.currentState.width = transitionElement.originalSize.width * transitionElement.currentState.z;
      this.update(transitionElement);
    } else {
      transitionElement.lastState.x = transitionElement.currentState.x;
      transitionElement.lastState.y = transitionElement.currentState.y;
      transitionElement.lastEvent = 'panend';
    }
  }
  pinchTransition(hammer: HammerCallback) {
    console.log(hammer.data.type);

    const transitionElement = hammer.transitionElements;
    console.log('type:', hammer.type);
    console.log('transitionElement:', transitionElement);
    hammer.transitionElements.originalSize.width = hammer.transitionElements.element.offsetWidth;
    hammer.transitionElements.originalSize.height = hammer.transitionElements.element.offsetHeight;
    if (hammer.data.type === 'pinchstart') {
      transitionElement.pinchStart.x = hammer.data.center.x;
      transitionElement.pinchStart.y = hammer.data.center.y;
      transitionElement.pinchZoomOrigin = this.getRelativePosition(transitionElement.element, { x: transitionElement.pinchStart.x, y: transitionElement.pinchStart.y }, transitionElement.originalSize, transitionElement.currentState.z);
      transitionElement.lastEvent = 'pinchstart';
    } else
      if (hammer.data.type === 'pinchend') {
        transitionElement.lastState.x = transitionElement.currentState.x;
        transitionElement.lastState.y = transitionElement.currentState.y;
        transitionElement.lastState.z = transitionElement.currentState.z;
        transitionElement.lastEvent = 'pinchend';
      } else {
        var d = this.scaleFrom(transitionElement.pinchZoomOrigin, transitionElement.lastState.z, transitionElement.lastState.z * hammer.data.scale, transitionElement.originalSize)
        transitionElement.currentState.x = d.x + transitionElement.lastState.x + hammer.data.deltaX;
        transitionElement.currentState.y = d.y + transitionElement.lastState.y + hammer.data.deltaY;
        transitionElement.currentState.z = d.z + transitionElement.lastState.z;
        transitionElement.lastEvent = 'pinch';
        this.update(transitionElement);
      }
  }
  doubletapTransition(hammer: HammerCallback) {
    console.log(hammer.data.type);
    const transitionElement = hammer.transitionElements;
    if (transitionElement.currentState.zooming === false) {
      transitionElement.currentState.zooming = true;
    } else {
      transitionElement.scaleFactor = -transitionElement.scaleFactor;
      transitionElement.currentState.zooming = false;
    }
    var zoomOrigin = this.getRelativePosition(transitionElement.element, { x: hammer.data.center.x, y: hammer.data.center.y }, transitionElement.originalSize, transitionElement.currentState.z);
    var d = this.scaleFrom(zoomOrigin, transitionElement.currentState.z, transitionElement.currentState.z + transitionElement.scaleFactor, transitionElement.originalSize)
    transitionElement.currentState.x += d.x;
    transitionElement.currentState.y += d.y;
    transitionElement.currentState.z += d.z;
    transitionElement.lastState.x = transitionElement.currentState.x;
    transitionElement.lastState.y = transitionElement.currentState.y;
    transitionElement.lastState.z = transitionElement.currentState.z;
    transitionElement.scaleFactor = 0.6;
    transitionElement.currentState.height = transitionElement.originalSize.height * transitionElement.currentState.z;
    transitionElement.currentState.width = transitionElement.originalSize.width * transitionElement.currentState.z;
    transitionElement.lastEvent = 'doubletap';
    this.update(transitionElement);
  }
  private update(transitionElement: TransitionElements) {
    if (isNaN(transitionElement.currentState.x)) {
      transitionElement.currentState.x = 0;
      transitionElement.lastState.x = 0;
    }
    if (isNaN(transitionElement.currentState.y)) {
      transitionElement.currentState.y = 0;
      transitionElement.lastState.y = 0;
    }
    if (isNaN(transitionElement.currentState.z)) {
      transitionElement.currentState.z = 0;
      transitionElement.lastState.z = 0;
    }
    transitionElement.element.style.transform = "translate3d(" + transitionElement.currentState.x + "px, " + transitionElement.currentState.y + "px, 0) scale(" + transitionElement.currentState.z + ")";
  }
  private getRelativePosition(element, point, originalSize, scale) {
    var domCoords = this.getCoords(element);
    var elementX = point.x - domCoords.x;
    var elementY = point.y - domCoords.y;
    var relativeX = elementX / (originalSize.width * scale / 2) - 1;
    var relativeY = elementY / (originalSize.height * scale / 2) - 1;
    return { x: relativeX, y: relativeY }
  }
  private getCoords(elem) {
    var box = elem.getBoundingClientRect();

    var body = document.body;
    var docEl = document.documentElement;

    var scrollTop = window.pageYOffset || docEl.scrollTop || body.scrollTop;
    var scrollLeft = window.pageXOffset || docEl.scrollLeft || body.scrollLeft;

    var clientTop = docEl.clientTop || body.clientTop || 0;
    var clientLeft = docEl.clientLeft || body.clientLeft || 0;

    var top = box.top + scrollTop - clientTop;
    var left = box.left + scrollLeft - clientLeft;

    return { x: Math.round(left), y: Math.round(top) };
  }
  private scaleFrom(zoomOrigin, currentScale, newScale, originalSize) {
    var currentShift = this.getCoordinateShiftDueToScale(originalSize, currentScale);
    var newShift = this.getCoordinateShiftDueToScale(originalSize, newScale)
    var zoomDistance = newScale - currentScale
    var shift = {
      x: currentShift.x - newShift.x,
      y: currentShift.y - newShift.y,
    }
    var output = {
      x: zoomOrigin.x * shift.x,
      y: zoomOrigin.y * shift.y,
      z: zoomDistance
    }
    return output
  }
  private getCoordinateShiftDueToScale(size, scale) {
    var newWidth = scale * size.width;
    var newHeight = scale * size.height;
    var dx = (newWidth - size.width) / 2
    var dy = (newHeight - size.height) / 2
    return {
      x: dx,
      y: dy
    }
  }
}

