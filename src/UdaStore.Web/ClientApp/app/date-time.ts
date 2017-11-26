export class DateTimPickerBase {
    vi: any;
    
    constructor() {
        this.vi = {
            firstDayOfWeek: 0,
            dayNames: ["Thứ 2", "Thứ 3", "Thứ 4","Thứ 5", "Thứ 6", "Thứ 7", "Chủ Nhật"],
            dayNamesShort: ["CN", "T2", "T3", "T4", "T5", "T6", "T7"],
            monthNames: [ "Tháng 1","Tháng 2","Tháng 3","Tháng 4","Tháng 5","Tháng 6","Tháng 7","Tháng 8","Tháng 9","Tháng 10","Tháng 11","Tháng 12" ],
            monthNamesShort: [ "Một", "Hai", "Ba", "Tư", "Năm", "Sáu","Bảy", "Tám", "Chín", "Mười", "Mười Một", "Mười Hai" ]
        };
    }
}