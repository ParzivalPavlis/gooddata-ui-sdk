// (C) 2025 GoodData Corporation

/* THIS FILE WAS AUTO-GENERATED USING MOCK HANDLING TOOL; YOU SHOULD NOT EDIT THIS FILE; GENERATE TIME: 2025-07-24T13:08:30.903Z; */

import df_label_f_activity_subject from "./metadata/displayForms/label.f_activity.subject/elements.json" with { type: "json" };
import df_label_f_product_product_name from "./metadata/displayForms/label.f_product.product.name/elements.json" with { type: "json" };
import df_f_owner_department_id from "./metadata/displayForms/f_owner.department_id/elements.json" with { type: "json" };
import df_f_owner_region_id from "./metadata/displayForms/f_owner.region_id/elements.json" with { type: "json" };
import df_f_stage_status_id from "./metadata/displayForms/f_stage.status_id/elements.json" with { type: "json" };
import df_f_opportunitysnapshot_forecastcategory_id from "./metadata/displayForms/f_opportunitysnapshot.forecastcategory_id/elements.json" with { type: "json" };
import df_attr_f_stage_stagename from "./metadata/displayForms/attr.f_stage.stagename/elements.json" with { type: "json" };
import df_label_f_account_account_name from "./metadata/displayForms/label.f_account.account.name/elements.json" with { type: "json" };
import df_user_id from "./metadata/displayForms/user_id/elements.json" with { type: "json" };
import df_user_id_username from "./metadata/displayForms/user_id.username/elements.json" with { type: "json" };

export const DataSamples = {
    Department: { DirectSales: df_f_owner_department_id[0], InsideSales: df_f_owner_department_id[1] },
    ForecastCategory: {
        Exclude: df_f_opportunitysnapshot_forecastcategory_id[0],
        Include: df_f_opportunitysnapshot_forecastcategory_id[1],
    },
    Name: {
        Decimal: df_label_f_account_account_name[0],
        AddVentures: df_label_f_account_account_name[1],
        Blank: df_label_f_account_account_name[2],
        MtMediaTemple: df_label_f_account_account_name[3],
        Properties: df_label_f_account_account_name[4],
        $1SourceConsulting: df_label_f_account_account_name[5],
        $1800Postcards: df_label_f_account_account_name[6],
        $1800WeAnswer: df_label_f_account_account_name[7],
        $1888OhioComp: df_label_f_account_account_name[8],
        $1000BulbsCom: df_label_f_account_account_name[9],
        $101Financial: df_label_f_account_account_name[10],
        $123Exteriors: df_label_f_account_account_name[11],
        $14West: df_label_f_account_account_name[12],
        $1SourceInternational: df_label_f_account_account_name[13],
        $1stChoiceStaffingAndConsulting: df_label_f_account_account_name[14],
        $1stInVideoMusicWorld: df_label_f_account_account_name[15],
        $2WheelBikes: df_label_f_account_account_name[16],
        $2HBSoftwareDesigns: df_label_f_account_account_name[17],
        $352MediaGroup: df_label_f_account_account_name[18],
        $3ballsCom: df_label_f_account_account_name[19],
        $3dCartShoppingCartSoftware: df_label_f_account_account_name[20],
        $3Degrees: df_label_f_account_account_name[21],
        $3E: df_label_f_account_account_name[22],
        $49erCommunications: df_label_f_account_account_name[23],
        $4thSource: df_label_f_account_account_name[24],
        $4WallEntertainment: df_label_f_account_account_name[25],
        $5LINXEnterprises: df_label_f_account_account_name[26],
        $614MediaGroup: df_label_f_account_account_name[27],
        $6KSystems: df_label_f_account_account_name[28],
        $7MedicalSystems: df_label_f_account_account_name[29],
        $7SimpleMachines: df_label_f_account_account_name[30],
        $7Eleven: df_label_f_account_account_name[31],
        $720Strategies: df_label_f_account_account_name[32],
        $90octane: df_label_f_account_account_name[33],
        $919Marketing: df_label_f_account_account_name[34],
        AMainHobbies: df_label_f_account_account_name[35],
        APlaceForMom: df_label_f_account_account_name[36],
        ASquaredGroup: df_label_f_account_account_name[37],
        AWhiteOrchidWedding: df_label_f_account_account_name[38],
        A1Textiles: df_label_f_account_account_name[39],
        ALifeMedical: df_label_f_account_account_name[40],
        ATSolutions: df_label_f_account_account_name[41],
        APomerantzAndCo: df_label_f_account_account_name[42],
        ABData: df_label_f_account_account_name[43],
        ARMSolutions: df_label_f_account_account_name[44],
        AAndCPlastics: df_label_f_account_account_name[45],
        AAndPConsultingTransportationEngineers: df_label_f_account_account_name[46],
        AAndRTarpaulins: df_label_f_account_account_name[47],
        AMortgageServices: df_label_f_account_account_name[48],
        ATutorU: df_label_f_account_account_name[49],
    },
    ProductName: {
        CompuSci: df_label_f_product_product_name[0],
        Educationly: df_label_f_product_product_name[1],
        Explorer: df_label_f_product_product_name[2],
        GrammarPlus: df_label_f_product_product_name[3],
        PhoenixSoft: df_label_f_product_product_name[4],
        TouchAll: df_label_f_product_product_name[5],
        WonderKid: df_label_f_product_product_name[6],
    },
    Region: {
        NULL: df_f_owner_region_id[0],
        Untitled: df_f_owner_region_id[1],
        EastCoast: df_f_owner_region_id[2],
        WestCoast: df_f_owner_region_id[3],
    },
    StageName: {
        ClosedLost: df_attr_f_stage_stagename[0],
        ClosedWon: df_attr_f_stage_stagename[1],
        Conviction: df_attr_f_stage_stagename[2],
        Discovery: df_attr_f_stage_stagename[3],
        Interest: df_attr_f_stage_stagename[4],
        Negotiation: df_attr_f_stage_stagename[5],
        RiskAssessment: df_attr_f_stage_stagename[6],
        ShortList: df_attr_f_stage_stagename[7],
    },
    Status: { Lost: df_f_stage_status_id[0], Open: df_f_stage_status_id[1], Won: df_f_stage_status_id[2] },
    Subject: {
        EmailWithAddVenturesOnMar2308: df_label_f_activity_subject[0],
        EmailWithMtMediaTempleOnApr2210: df_label_f_activity_subject[1],
        EmailWithAddVenturesOnApr0208: df_label_f_activity_subject[2],
        EmailWithAddVenturesOnJun2610: df_label_f_activity_subject[3],
        EmailWithAddVenturesOnJul0310: df_label_f_activity_subject[4],
        EmailWithAddVenturesOnJul1209: df_label_f_activity_subject[5],
        EmailWithAddVenturesOnJul2109: df_label_f_activity_subject[6],
        EmailWithMtMediaTempleOnAug0110: df_label_f_activity_subject[7],
        EmailWithAddVenturesOnOct2708: df_label_f_activity_subject[8],
        EmailWithAddVenturesOnOct0609: df_label_f_activity_subject[9],
    },
    UserId: {
        $10001: df_user_id[0],
        $10002: df_user_id[1],
        $10003: df_user_id[2],
        $10004: df_user_id[3],
        $10005: df_user_id[4],
        $10006: df_user_id[5],
        $10007: df_user_id[6],
        $10008: df_user_id[7],
        $10009: df_user_id[8],
        $10010: df_user_id[9],
        $10011: df_user_id[10],
        $10012: df_user_id[11],
        $10013: df_user_id[12],
        $10014: df_user_id[13],
        $10015: df_user_id[14],
        $10016: df_user_id[15],
        $10017: df_user_id[16],
        $10018: df_user_id[17],
        $10019: df_user_id[18],
        $10020: df_user_id[19],
        $10021: df_user_id[20],
        $10022: df_user_id[21],
    },
    UserName: {
        AndrewHarris: df_user_id_username[0],
        BrianClark: df_user_id_username[1],
        ChristopherThomas: df_user_id_username[2],
        DanielJackson: df_user_id_username[3],
        DavidWilson: df_user_id_username[4],
        JohnSmith: df_user_id_username[5],
        JohnSmith_$10007: df_user_id_username[6],
        JosephMoore: df_user_id_username[7],
        JosephMoore_$10009: df_user_id_username[8],
        JoshuaMartin: df_user_id_username[9],
        JoshuaMartin_$10011: df_user_id_username[10],
        JoshuaMartin_$10012: df_user_id_username[11],
        MatthewWhite: df_user_id_username[12],
        NicholasMartinez: df_user_id_username[13],
        NicholasMartinez_$10015: df_user_id_username[14],
        SamuelLewis: df_user_id_username[15],
        SamuelLewis_$10017: df_user_id_username[16],
        SamuelLewis_$10018: df_user_id_username[17],
        ThomasAnderson: df_user_id_username[18],
        WilliamBrown: df_user_id_username[19],
        WilliamBrown_$10021: df_user_id_username[20],
        WilliamBrown_$10022: df_user_id_username[21],
    },
};
