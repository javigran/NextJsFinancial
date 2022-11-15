/**
 * PMT, one of the financial functions,
 * calculates the payment for a loan based on constant payments and a constant interest rate. 
 * @param {interest rate 0.02} ir 
 * @param {number of payment 24} np 
 * @param {present value or loan amount 25000000} pv 
 * @param {future value. default is 0} fv 
 * @returns 
 */
export default function PMT(ir,np, pv, fv = 0){ 
    var presentValueInterstFector = Math.pow((1 + ir), np);
    var pmt = ir * pv  * (presentValueInterstFector + fv)/(presentValueInterstFector-1); 
    return pmt;
   }