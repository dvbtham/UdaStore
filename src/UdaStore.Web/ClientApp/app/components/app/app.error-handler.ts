import { ErrorHandler, Inject, NgZone } from "@angular/core";
import { ToastyService } from "ng2-toasty";

export class AppErrorHandler implements ErrorHandler {
    constructor(@Inject(NgZone) private ngZone: NgZone,
        @Inject(ToastyService) private toastr: ToastyService) { }

    handleError(error: any): void {

        this.ngZone.run(() => {
            this.toastr.error({
                title: 'Lỗi',
                msg: 'Sự số đã xảy ra khi thực hiện yêu cầu.',
                theme: 'material',
                showClose: true,
                timeout: 5000
            });
        });

        throw error;

    }

}