
from odoo import models,fields , api
from odoo.exceptions import ValidationError
from datetime import date

class ITIStudentLevelLogs(models.Model):
    _name = 'iti.student.level.logs'

    description = fields.Text()
    student_id = fields.Many2one('iti.student')


class ITIStudent(models.Model):
    _name = 'iti.student'
    _rec_name = 'name'

    name = fields.Char('Name' , required = True)
    age = fields.Integer('Age' , compute = '_compute_age' , store = True)
    graduate_age = fields.Integer(compute = '_compute_age')


    birth_date = fields.Date()
    salary = fields.Float()

    cv = fields.Html()
    gender = fields.Selection([('male', 'Male') , ('female' , 'Female')] , default = 'male')

    level = fields.Selection([('prep', 'Prep') , ('sec' , 'Sec') , ('graduate' , 'Graduate')] )

    is_accepted = fields.Boolean()
    is_working = fields.Boolean(default = False)


    track_id = fields.Many2one('iti.track')
    track_capacity = fields.Integer(related = 'track_id.capacity')

    level_logs = fields.One2many('iti.student.level.logs' , 'student_id')

    _sql_constraints = [
        ('iti_student_unique_name', 'UNIQUE(name)' ,'This username is already enrolled')
    ]

    @api.depends('birth_date')
    def _compute_age(self):
        for rec in self:
            if rec.birth_date:
                today = date.today()
                rec.age = today.year - rec.birth_date.year - (
                        (today.month, today.day) < (rec.birth_date.month, rec.birth_date.day))
            else:
                rec.age = 10

            rec.graduate_age = rec.age + 10

    @api.constrains('name')
    def check_name(self):
        for rec in self:
            rows_count = self.search_count([('id' , '!=' , rec.id) , ('name', '=', rec.name)])
            if rows_count :
                raise ValidationError('This Username is already taken')


    @api.constrains('age')
    def check_age(self):
        for rec in self:
            if rec.age < 10 :
                raise ValidationError('Age Can\'t be less than 10')
            

    def accept_student(self):
        for rec in self:
            rec.is_accepted = True

    
    def check_level(self):
        for rec in self:
            if rec.level =='prep' :
                rec.level = 'sec'

            elif rec.level == 'sec':
                rec.level = 'graduate'


    @api.onchange('track_id')
    def track_change(self):
        for rec in self:
            if rec.track_id :
                rec.level = 'prep'
                return {
                    'warning' : {
                        'title' : 'Track Change Warning',
                        'message' : 'Track is Changed to %s'%(rec.track_id.track_name)
                    }
                }

    @api.onchange('level')
    def level_log(self):
        for rec in self:
            vals = {
                'description' : 'Level Changed into %s'%(rec.level),
                'student_id' : rec._origin.id
            }

            rec.env['iti.student.level.logs'].create(vals)