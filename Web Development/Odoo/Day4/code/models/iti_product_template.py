from odoo import fields , models

class ITIProductTemplate(models.Model):
    _inherit = 'product.template'


    barcode2 = fields.Char('Industrical Barcode')

    default_code = fields.Char(required = True)

