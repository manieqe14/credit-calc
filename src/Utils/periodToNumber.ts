import { Period } from "../components/types"

export const periodToNumber = (period: Period) => {
    switch(period.valueOf()){
        case Period.MONTH:
            return 1;
        case Period.QUARTER:
            return 3;
        default:
            return 12;
    }
  }