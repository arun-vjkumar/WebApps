import { PipeTransform } from "@nestjs/common";
import { ObjectID } from "mongodb";


export class TaskIdValidationPipe implements PipeTransform {

    transform(value: any) {
        if (!ObjectID.isValid(value)) {
            return Promise.reject(new TypeError(`Invalid id: ${value}`));
          }
        return ObjectID.createFromHexString(value);
    }
}