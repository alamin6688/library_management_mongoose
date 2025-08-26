"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const mongoose_1 = __importDefault(require("mongoose"));
const app_1 = __importDefault(require("./app"));
const config_1 = __importDefault(require("./config"));
let server;
const port = config_1.default.port || 3000;
function main() {
    return __awaiter(this, void 0, void 0, function* () {
        const dbUri = config_1.default.database_url ||
            `mongodb+srv://${process.env.DATABASE_USER}:${process.env.DATABASE_PASSWORD}@cluster0.nrlryfn.mongodb.net/library_management?retryWrites=true&w=majority&appName=Cluster0`;
        yield mongoose_1.default.connect(dbUri);
        console.log("Connected to MongoDB using Mongoose!");
        try {
            server = app_1.default.listen(port, () => {
                console.log(`✅ Server running on port ${port}`);
            });
        }
        catch (error) {
            console.log("❌ Error connecting to MongoDB:", error);
        }
    });
}
main();
