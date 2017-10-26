using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace UdaStore.Infrastructure.Models
{
    public abstract class ValidatableObject
    {
        public virtual bool IsValid()
        {
            return ValidationResults().Count == 0;
        }

        public virtual IList<ValidationResult> ValidationResults()
        {
            IList<ValidationResult> validationResults = new List<ValidationResult>();
            Validator.TryValidateObject(this, new ValidationContext(this, null, null), validationResults, true);
            return validationResults;
        }
    }
}
