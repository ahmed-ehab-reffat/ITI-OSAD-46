class Person:
    moods = ("happy", "tired", "lazy")

    def __init__(self, name, money=0, mood="happy", healthRate=100):
        self.name = name
        self.money = float(money)
        self._mood = mood if mood in Person.moods else "happy"
        self._healthRate = self._clamp_health(healthRate)

    def _clamp_health(self, val):
        try:
            v = int(val)
        except Exception:
            v = 100
        if v < 0:
            v = 0
        if v > 100:
            v = 100
        return v

    @property
    def healthRate(self):
        return self._healthRate

    @healthRate.setter
    def healthRate(self, value):
        self._healthRate = self._clamp_health(value)

    @property
    def mood(self):
        return self._mood

    @mood.setter
    def mood(self, value):
        if value in Person.moods:
            self._mood = value

    def sleep(self, hours):
        if hours == 7:
            self.mood = "happy"
        elif hours < 7:
            self.mood = "tired"
        else:
            self.mood = "lazy"
        return self.mood

    def eat(self, meals):
        if meals == 3:
            self.healthRate = 100
        elif meals == 2:
            self.healthRate = 75
        elif meals == 1:
            self.healthRate = 50
        return self.healthRate

    def buy(self, items=1):
        try:
            qty = int(items)
        except Exception:
            qty = 1
        cost = 10 * qty
        self.money = max(0.0, self.money - cost)
        return self.money
