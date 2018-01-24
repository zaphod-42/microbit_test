/**
 * Functions to simplify I2C
 */

//% color=#f44242 icon="\u26C8"

namespace i2c{
	//% weight=1 blockGap=8 blockId="i2c_read_byte" block="i2c read byte"
	export function readByte(address: number, register: number, format: NumberFormat): number {
		pins.i2cWriteNumber(address, register, NumberFormat.UInt8LE, false)
	    let val = pins.i2cReadNumber(address, format, false)
	    return val
	}
	//% weight=2 blockGap=8 blockId="i2c_write_byte" block="i2c write byte"
	export function writeByte(address: number, register: number, value: number): void{
		pins.i2cWriteNumber(address, register << 8 | value, NumberFormat.Int16BE)
	}
}
