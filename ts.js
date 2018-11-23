var BodyScrollLock;
(function (BodyScrollLock) {
    

    var restoreOverflowSetting = function () {
        setTimeout(function () {
            if (previousBodyPaddingRight !== undefined) {
                document.body.style.paddingRight = previousBodyPaddingRight;
                previousBodyPaddingRight = undefined;
            }
            if (previousBodyOverflowSetting !== undefined) {
                document.body.style.overflow = previousBodyOverflowSetting;
                previousBodyOverflowSetting = undefined;
            }
        });
    };
    var isTargetElementTotallyScrolled = function (targetElement) {
        return targetElement ? targetElement.scrollHeight - targetElement.scrollTop <= targetElement.clientHeight : false;
    };
    var handleScroll = function (event, targetElement) {
        var clientY = event.targetTouches[0].clientY - initialClientY;
        if (targetElement && targetElement.scrollTop === 0 && clientY > 0) {
            return preventDefault(event);
        }
        if (isTargetElementTotallyScrolled(targetElement) && clientY < 0) {
            return preventDefault(event);
        }
        event.stopPropagation();
        return true;
    };
    BodyScrollLock.disableBodyScroll = function (targetElement, options) {
        if (isIosDevice) {
            if (targetElement && allTargetElements.indexOf(targetElement) > -1) {
                allTargetElements = allTargetElements.concat([targetElement]);
                targetElement.ontouchstart = function (event) {
                    if (event.targetTouches.length === 1) {
                        initialClientY = event.targetTouches[0].clientY;
                    }
                };
                targetElement.ontouchmove = function (event) {
                    if (event.targetTouches.length === 1) {
                        handleScroll(event, targetElement);
                    }
                };
                if (!documentListenerAdded) {
                    document.addEventListener('touchmove', preventDefault, hasPassiveEvents);
                    documentListenerAdded = true;
                }
            }
        }
        else {
            setOverflowHidden(options);
            if (!firstTargetElement)
                firstTargetElement = targetElement;
        }
    };
    BodyScrollLock.clearAllBodyScrollLocks = function () {
        if (isIosDevice) {
            allTargetElements.forEach(function (targetElement) {
                targetElement.ontouchstart = null;
                targetElement.ontouchmove = null;
            });
            if (documentListenerAdded) {
                document.removeEventListener('touchmove', preventDefault, hasPassiveEvents);
                documentListenerAdded = false;
            }
            allTargetElements = [];
            initialClientY = -1;
        }
        else {
            restoreOverflowSetting();
            firstTargetElement = null;
        }
    };
    BodyScrollLock.enableBodyScroll = function (targetElement) {
        if (isIosDevice) {
            console.log('if (isIosDevice)');
            targetElement.ontouchstart = null;
            targetElement.ontouchmove = null;
            allTargetElements = allTargetElements.filter(function (element) { return element !== targetElement; });
            if (documentListenerAdded && allTargetElements.length === 0) {
                document.removeEventListener('touchmove', preventDefault, hasPassiveEvents);
                console.log(' if (documentListenerAdded && allTargetElements.length === 0)');
                documentListenerAdded = false;
            }
        }
        else if (firstTargetElement === targetElement) {
            restoreOverflowSetting();
            console.log('  } else if (firstTargetElement === targetElement) {');
            firstTargetElement = null;
        }
    };
})(BodyScrollLock = exports.BodyScrollLock || (exports.BodyScrollLock = {}));