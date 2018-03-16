package gtw.galileo.booking.repository.search;

import gtw.galileo.booking.domain.ConfigFees;
import org.springframework.data.elasticsearch.repository.ElasticsearchRepository;

/**
 * Spring Data Elasticsearch repository for the ConfigFees entity.
 */
public interface ConfigFeesSearchRepository extends ElasticsearchRepository<ConfigFees, Long> {
}
