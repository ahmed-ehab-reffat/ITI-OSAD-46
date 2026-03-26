class Car:
    def __init__(self, name, fuelRate=100, velocity=0):
        self.name = name
        self._fuelRate = None
        self._velocity = None
        self.fuelRate = fuelRate
        self.velocity = velocity

    @property
    def fuelRate(self):
        return self._fuelRate

    @fuelRate.setter
    def fuelRate(self, value):
        try:
            v = float(value)
        except Exception:
            v = 0.0
        if v < 0:
            v = 0.0
        if v > 100:
            v = 100.0
        self._fuelRate = v

    @property
    def velocity(self):
        return self._velocity

    @velocity.setter
    def velocity(self, value):
        try:
            v = float(value)
        except Exception:
            v = 0.0
        if v < 0:
            v = 0.0
        if v > 200:
            v = 200.0
        self._velocity = v

    def run(self, velocity, distance):
        self.velocity = velocity
        initial_fuel = self.fuelRate
        needed = distance
        if initial_fuel >= needed:
            self.fuelRate = initial_fuel - needed
            remaining = 0
        else:
            remaining = needed - initial_fuel
            self.fuelRate = 0
        self.stop(remaining)
        return remaining

    def stop(self, remain_distance=0):
        self.velocity = 0
        if remain_distance <= 0:
            print(f"Car {self.name}: Arrived at destination.")
        else:
            print(f"Car {self.name}: Stopped. Remaining distance: {remain_distance} (fuel exhausted).")
