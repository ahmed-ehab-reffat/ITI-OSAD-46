from django.db.models.signals import post_save , pre_save
from django.dispatch import receiver
from django.contrib.auth.models import User
from .models import Order
from django.utils import timezone

@receiver(post_save, sender=Order)
def update_order_status(sender, instance, created, **kwargs):
    if created:
        instance.order_status = 'pending'
        instance.pending_date = timezone.now()
        instance.save()
    else:
        if instance.order_status == 'shipped' and not instance.shipped_date:
            instance.shipped_date = timezone.now()
            instance.save()
        elif instance.order_status == 'delivered' and not instance.delivered_date:
            instance.delivered_date = timezone.now()
            instance.save()
        elif instance.order_status == 'cancelled' and not instance.cancelled_date:
            instance.cancelled_date = timezone.now()
            instance.save()
            
            