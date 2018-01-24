/**
 * MCP23008 Control
 */

//% color=#f44242 icon="\u26C8"

namespace i2c{
	//default address
	let device_address = 20;

	//registers
	let config_output = 0;
	let config_input = 6;
	let reg_output = 10;
	let reg_input = 9;

	//% weight=1 blockGap=8 blockId="mcp23008_set_addr" block="mcp23008 set address"
	export function setAddress(address: number): void{
		device_address = address;
	}

	//% weight=2 blockGap=8 blockId="mcp23008_set_io" block="mcp23008 set io"
	export function setIO(IOMap: number): void{
		sendCommand(0x00, IOMap);
		sendCommand(0x06, IOMap);
	}

	//% weight=3 blockGap=8 blockId="mcp23008_relay_on" block="mcp23008 relay on"
	export function turnOnRelay(relay: number): bool{
		let status = readRelayStatus();
		status |= (1 << (number - 1));
		setBankStatus(status);
		return status == readRelayStatus();
	}

	//% weight=4 blockGap=8 blockId="mcp23008_relay_off" block="mcp23008 relay off"
	export function turnOffRelay(relay: number): bool{
		let status = readRelayStatus();
		status &= ~(1 << (number - 1));
		setBankStatus(status);
		return status == readRelayStatus();
	}

	//% weight=5 blockGap=8 blockId="mcp23008_relay_toggle" block="mcp23008 relay toggle"
	export function toggleRelay(relay: number): bool{
		let status = readRelayStatus();
		status ^= (1 << (number - 1));
		setBankStatus(status);
		return status == readRelayStatus();
	}

	//% weight=6 blockGap=8 blockId="mcp23008_all_on" block="mcp23008 all on"
	export function turnOnAll(): bool{
		setBankStatus(255);
		return 255 == readRelayStatus();
	}

	//% weight=7 blockGap=8 blockId="mcp23008_all_off" block="mcp23008 all off"
	export function turnOffAll(): bool{
		setBankStatus(0);
		return 0 == readRelayStatus();
	}

	//% weight=8 blockGap=8 blockId="mcp23008_read_outputs" block="mcp23008 read outputs"
	export function readRelayStatus(): number{
		return i2c.readByte(reg_output);
	}

	//% weight=9 blockGap=8 blockId="mcp23008_write_outputs" block="mcp23008 write outputs"
	export function setBankStatus(status: number): void{
		i2c.writeByte(reg_output, status);
	}
}
