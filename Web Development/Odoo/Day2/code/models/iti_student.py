
from odoo import models,fields , api


class ITIStudent(models.Model):
    _name = 'iti.student'
    _rec_name = 'name'

    name = fields.Char('Name' , required = True)
    age = fields.Integer('Age')


    birth_date = fields.Date()
    salary = fields.Float()

    cv = fields.Html()
    gender = fields.Selection([('male', 'Male') , ('female' , 'Female')] , default = 'male')

    level = fields.Selection([('prep', 'Prep') , ('sec' , 'Sec') , ('graduate' , 'Graduate')] )

    is_accepted = fields.Boolean()
    is_working = fields.Boolean(default = False)


    track_id = fields.Many2one('iti.track')
    track_capacity = fields.Integer(related = 'track_id.capacity')



    def accept_student(self):
        self.is_accepted = True


    
    def check_level(self):
        if self.level == 'prep' :
            self.level = 'sec'

        elif self.level == 'sec':
            self.level = 'graduate'


    @api.onchange('track_id')
    def track_change(self):
        if self.track_id :
            self.level = 'prep'
            return {
                'warning' : {
                    'title' : 'Track Change Warning',
                    'message' : 'Track is Changed to %s'%(self.track_id.track_name)
                }
            }
