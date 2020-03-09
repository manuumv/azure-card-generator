import { get } from "../../../common/utils/httpHelper";
import { loginEndpoint } from "./endpoints";

export const login = async (organization: string) => await get(loginEndpoint(organization));
