/**
 * Functions to simplify I2C
 */

//% color=#f44242 icon="\u26C8"
namespace i2c {
    /**
     * @param address the 7-bit i2c address to read from
     * @param register the register to read from
     * @param format the number format to return the data in
     */

    //% weight=1 blockGap=8 blockId="i2c_read_byte" block="i2c read byte|from address %address|at register %register|in format %format"
    export function readByte(address: number, register: number, format: NumberFormat = NumberFormat.UInt8LE): number {
        pins.i2cWriteNumber(address, register, NumberFormat.UInt8LE, false)
        let val = pins.i2cReadNumber(address, format, false)
        return val
    }

    /**
     * @param address the 7-bit i2c address to read from
     * @param register the register to read from
     * @param value the byte to write to the register
     */
    //% weight=2 blockGap=8 blockId="i2c_write_byte" block="i2c write byte|to address %address|at register %register|write value %value"
    export function writeByte(address: number, register: number, value: number): void {
        pins.i2cWriteNumber(address, register << 8 | value, NumberFormat.Int16BE)
    }
}

/**
 * MCP23008 Control
 */

//% color=#f44242 icon="\u26C8"
namespace mcp23008 {
    //default address
    let device_address = 20;

    //registers
    let config_output = 0;
    let config_input = 6;
    let reg_output = 10;
    let reg_input = 9;

    /**
     * @param address the 7-bit i2c address of the device
     */

    //% weight=1 blockGap=8 blockId="mcp23008_set_addr" block="mcp23008 set address|to %address"
    export function setAddress(address: number): void {
        device_address = address
    }

    //% weight=2 blockGap=8 blockId="mcp23008_set_io" block="mcp23008 set io|to IOMap %IOMap"
    export function setIO(IOMap: number): void {
        i2c.writeByte(device_address, config_output, IOMap)
        i2c.writeByte(device_address, config_input, IOMap)
    }

    //% weight=3 blockGap=8 blockId="mcp23008_relay_on" block="mcp23008 turn on|relay %relay"
    export function turnOnRelay(relay: number): void {
        let status = readRelayStatus();
        status |= (1 << (relay - 1))
        setBankStatus(status)
    }

    //% weight=4 blockGap=8 blockId="mcp23008_relay_off" block="mcp23008 turn off|relay %relay"
    export function turnOffRelay(relay: number): void {
        let status = readRelayStatus()
        // let update = (1 << (relay - 1))
        // status &= ~update;
        // setBankStatus(status);
    }

    //% weight=5 blockGap=8 blockId="mcp23008_relay_toggle" block="mcp23008 toggle|relay %relay"
    export function toggleRelay(relay: number): void {
        let status = readRelayStatus()
        status ^= (1 << (relay - 1))
        setBankStatus(status)
    }

    //% weight=6 blockGap=8 blockId="mcp23008_all_on" block="mcp23008 all on"
    export function turnOnAll(): void {
        setBankStatus(255)
    }

    //% weight=7 blockGap=8 blockId="mcp23008_all_off" block="mcp23008 all off"
    export function turnOffAll(): void {
        setBankStatus(0)
    }

    //% weight=8 blockGap=8 blockId="mcp23008_read_outputs" block="mcp23008 read outputs"
    export function readRelayStatus(): number {
        return i2c.readByte(device_address, reg_output)
    }

    //% weight=9 blockGap=8 blockId="mcp23008_write_outputs" block="mcp23008 write outputs"
    export function setBankStatus(status: number): void {
        i2c.writeByte(device_address, reg_output, status)
    }
}
