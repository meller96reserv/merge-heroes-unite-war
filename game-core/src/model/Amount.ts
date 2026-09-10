/** Exact, nonnegative integer currency. Display strings are never inputs. */
export class Amount {
  private constructor(private readonly units:bigint){Object.freeze(this);}
  static from(value:string|bigint):Amount {
    if(typeof value==='string'&&!/^(0|[1-9][0-9]*)$/.test(value))throw Error('Amount must be canonical decimal');
    const units=BigInt(value);if(units<0n)throw Error('Amount cannot be negative');return new Amount(units);
  }
  add(other:Amount){return Amount.from(this.units+other.units);}
  subtract(other:Amount){return Amount.from(this.units-other.units);}
  multiply(value:bigint){return Amount.from(this.units*value);}
  divideFloor(value:bigint){if(value<=0n)throw Error('Invalid divisor');return Amount.from(this.units/value);}
  compare(other:Amount): -1|0|1{return this.units<other.units?-1:this.units>other.units?1:0;}
  toString(){return this.units.toString();}
  toJSON(){return this.toString();}
}
