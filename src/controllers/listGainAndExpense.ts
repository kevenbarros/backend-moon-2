import { Request, Response, NextFunction } from "express"
import { Gain, IGain } from "../models/Gain"
import { Expense } from "../models/Expense"
import authMiddleware from "../middleware/authMiddleware";
interface resList {
  id_user: string;
  date: string | Date;
}
function getFirstAndLastDayOfMonth(date: Date) {
  const year = date.getFullYear();
  const month = date.getMonth();
  const firstDay = new Date(year, month, 1);
  const lastDay = new Date(year, month + 1, 0);

  return {
    firstDay,
    lastDay
  };
}
const allList = async (req: Request, res: Response) => {
  let { id_user, date }: resList = req.body;
  try {
    authMiddleware(req, res)
    console.log(id_user, "id_userid_user")
    const aux: IGain[] = []
    if (!date) date = new Date()
    const dateInitial = new Date(date)
    if (!id_user) return res.status(500).json({ error: "user required" });

    const listGeneralGain = await Gain.find({ id_user })
    const listGeneralExpense = await Expense.find({ id_user })
    listGeneralGain.forEach((e, i) => {
      if (e.paymentConditions === "Despesa recorrente") {
        aux.push(e)
        return
      }
      if (new Date(e.date).getMonth() == dateInitial.getMonth()) {
        aux.push(e)
        return
      }
      if (e.paymentConditions === "Parcelado" && e.qtdInstallments) {
        let finalDateInstallments = new Date(e.date)
        finalDateInstallments.setMonth(finalDateInstallments.getMonth() + e.qtdInstallments)
        if (
          new Date(e.date).getMonth() <= dateInitial.getMonth()
          &&
          finalDateInstallments.getMonth() >= dateInitial.getMonth()
        ) {
          aux.push(e)
          return
        }
      }
    })
    listGeneralExpense.forEach((e) => {
      if (e.paymentConditions === "Despesa recorrente") {
        aux.push(e)
        return
      }
      if (new Date(e.date).getMonth() == dateInitial.getMonth()) {
        aux.push(e)
        return
      }
      if (e.paymentConditions === "Parcelado" && e.qtdInstallments) {
        let finalDateInstallments = new Date(e.date)
        finalDateInstallments.setMonth(finalDateInstallments.getMonth() + e.qtdInstallments)
        if (
          new Date(e.date).getMonth() <= dateInitial.getMonth()
          &&
          finalDateInstallments.getMonth() >= dateInitial.getMonth()
        ) {
          aux.push(e)
          return
        }
      }
    })
    return res.status(201).json(aux.sort((a: IGain, b: IGain) => new Date(a.date).getMilliseconds() - new Date(b.date).getMilliseconds()));
  } catch (err) {
    return res.status(500).json({ error: err });
  }
}
export { allList };
