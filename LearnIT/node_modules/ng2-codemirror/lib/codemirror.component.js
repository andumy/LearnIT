"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
// Imports
var core_1 = require("@angular/core");
var forms_1 = require("@angular/forms");
var CodeMirror = require("codemirror");
/**
 * CodeMirror component
 * Usage :
 * <codemirror [(ngModel)]="data" [config]="{...}"></codemirror>
 */
var CodemirrorComponent = CodemirrorComponent_1 = (function () {
    /**
     * Constructor
     */
    function CodemirrorComponent() {
        this.change = new core_1.EventEmitter();
        this.focus = new core_1.EventEmitter();
        this.blur = new core_1.EventEmitter();
        this.instance = null;
        this._value = '';
    }
    Object.defineProperty(CodemirrorComponent.prototype, "value", {
        get: function () { return this._value; },
        set: function (v) {
            if (v !== this._value) {
                this._value = v;
                this.onChange(v);
            }
        },
        enumerable: true,
        configurable: true
    });
    ;
    /**
     * On component destroy
     */
    CodemirrorComponent.prototype.ngOnDestroy = function () {
    };
    /**
     * On component view init
     */
    CodemirrorComponent.prototype.ngAfterViewInit = function () {
        this.config = this.config || {};
        this.codemirrorInit(this.config);
    };
    /**
     * Initialize codemirror
     */
    CodemirrorComponent.prototype.codemirrorInit = function (config) {
        var _this = this;
        this.instance = CodeMirror.fromTextArea(this.host.nativeElement, config);
        this.instance.setValue(this._value);
        this.instance.on('change', function () {
            _this.updateValue(_this.instance.getValue());
        });
        this.instance.on('focus', function () {
            _this.focus.emit();
        });
        this.instance.on('blur', function () {
            _this.blur.emit();
        });
    };
    /**
     * Value update process
     */
    CodemirrorComponent.prototype.updateValue = function (value) {
        this.value = value;
        this.onTouched();
        this.change.emit(value);
    };
    /**
     * Implements ControlValueAccessor
     */
    CodemirrorComponent.prototype.writeValue = function (value) {
        this._value = value || '';
        if (this.instance) {
            this.instance.setValue(this._value);
        }
    };
    CodemirrorComponent.prototype.onChange = function (_) { };
    CodemirrorComponent.prototype.onTouched = function () { };
    CodemirrorComponent.prototype.registerOnChange = function (fn) { this.onChange = fn; };
    CodemirrorComponent.prototype.registerOnTouched = function (fn) { this.onTouched = fn; };
    return CodemirrorComponent;
}());
__decorate([
    core_1.Input(),
    __metadata("design:type", Object)
], CodemirrorComponent.prototype, "config", void 0);
__decorate([
    core_1.Output(),
    __metadata("design:type", Object)
], CodemirrorComponent.prototype, "change", void 0);
__decorate([
    core_1.Output(),
    __metadata("design:type", Object)
], CodemirrorComponent.prototype, "focus", void 0);
__decorate([
    core_1.Output(),
    __metadata("design:type", Object)
], CodemirrorComponent.prototype, "blur", void 0);
__decorate([
    core_1.ViewChild('host'),
    __metadata("design:type", Object)
], CodemirrorComponent.prototype, "host", void 0);
__decorate([
    core_1.Output(),
    __metadata("design:type", Object)
], CodemirrorComponent.prototype, "instance", void 0);
__decorate([
    core_1.Input(),
    __metadata("design:type", Object),
    __metadata("design:paramtypes", [Object])
], CodemirrorComponent.prototype, "value", null);
CodemirrorComponent = CodemirrorComponent_1 = __decorate([
    core_1.Component({
        selector: 'codemirror',
        providers: [
            {
                provide: forms_1.NG_VALUE_ACCESSOR,
                useExisting: core_1.forwardRef(function () { return CodemirrorComponent_1; }),
                multi: true
            }
        ],
        template: "<textarea #host></textarea>",
    }),
    __metadata("design:paramtypes", [])
], CodemirrorComponent);
exports.CodemirrorComponent = CodemirrorComponent;
var CodemirrorComponent_1;
//# sourceMappingURL=codemirror.component.js.map