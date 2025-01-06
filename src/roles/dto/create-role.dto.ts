import { IsEnum, IsNotEmpty } from "class-validator";
import { RoleType } from "src/common/enums/role.enum";

export class CreateRoleDto {
    @IsNotEmpty()
    @IsEnum(RoleType, {
        message: 'Type must be one of the following values: ' + Object.values(RoleType).join(', '),
    })
    type: RoleType;
}
